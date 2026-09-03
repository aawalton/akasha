import { monthKeyOf, periodAnchorsOf } from "../decide-keeps/decide-keeps.module.code.ts"
import type { BackupCandidate } from "../keep-decision/keep-decision.module.code.ts"

export interface LongtailBackup extends BackupCandidate {
  readonly beginWal: string
  readonly endWal: string
}

export interface LongtailUnit {
  readonly backupId: string
  readonly beginWal: string
  readonly endWal: string
  readonly reason: string
}

export interface DecideLongtailInput {
  readonly backups: readonly LongtailBackup[]
  readonly todayUtc: string
  readonly monthlyKeepCount: number
}

const WAL_PREFIX_PATTERN = /^[0-9A-F]{16}$/
const WAL_SEGMENT_PATTERN = /^[0-9A-F]{24}$/

export function decideLongtailUnits(input: DecideLongtailInput): readonly LongtailUnit[] {
  const byId = new Map<string, LongtailBackup>(
    input.backups.map((backup) => [backup.backupId, backup])
  )
  const { monthAnchors } = periodAnchorsOf(input.backups, input.todayUtc)

  const keptMonthKeys =
    input.monthlyKeepCount > 0 ? [...monthAnchors.keys()].sort().slice(-input.monthlyKeepCount) : []

  const units: LongtailUnit[] = []
  for (const monthKey of keptMonthKeys) {
    const anchor = monthAnchors.get(monthKey)
    const full = anchor === undefined ? undefined : byId.get(anchor.backupId)
    if (full === undefined) continue
    units.push({
      backupId: full.backupId,
      beginWal: full.beginWal,
      endWal: full.endWal,
      reason: `monthly anchor ${monthKey}`,
    })
  }

  const currentMonth = monthKeyOf(input.todayUtc)
  const provisional = input.backups
    .filter(
      (backup) =>
        backup.status === "DONE" && monthKeyOf(backup.beginTimeIso.slice(0, 10)) === currentMonth
    )
    .toSorted((a, b) => a.beginTimeIso.localeCompare(b.beginTimeIso))
    .at(0)
  if (provisional !== undefined) {
    units.push({
      backupId: provisional.backupId,
      beginWal: provisional.beginWal,
      endWal: provisional.endWal,
      reason: `provisional anchor ${currentMonth}`,
    })
  }

  return units
}

export function walPrefixDirsInRange(
  dirNames: readonly string[],
  beginWal: string,
  endWal: string
): readonly string[] {
  const beginPrefix = beginWal.slice(0, 16)
  const endPrefix = endWal.slice(0, 16)
  return dirNames
    .filter((name) => WAL_PREFIX_PATTERN.test(name) && name >= beginPrefix && name <= endPrefix)
    .toSorted()
}

export function walFilesInRange(
  fileNames: readonly string[],
  beginWal: string,
  endWal: string
): readonly string[] {
  return fileNames
    .filter((name) => {
      if (name.endsWith(".partial")) return false
      const segment = name.slice(0, 24)
      if (!WAL_SEGMENT_PATTERN.test(segment)) return false
      const suffix = name.slice(24)
      if (suffix !== "" && !suffix.startsWith(".")) return false
      return segment >= beginWal && segment <= endWal
    })
    .toSorted()
}

export function isHistoryFile(name: string): boolean {
  return /^[0-9A-F]{8}\.history(\.[A-Za-z0-9]+)?$/.test(name)
}

export function decidePrunes(
  existingIds: readonly string[],
  desiredIds: readonly string[]
): readonly string[] {
  const desired = new Set(desiredIds)
  return existingIds.filter((id) => !desired.has(id)).toSorted()
}
