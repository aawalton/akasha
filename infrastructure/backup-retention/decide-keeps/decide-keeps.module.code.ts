import type {
  BackupCandidate,
  DecideKeepInput,
  DecideKeepResult,
  KeepAction,
  KeepDisagreement,
} from "../keep-decision/keep-decision.module.code.ts"

const MS_PER_DAY = 86_400_000

export function utcMidnightOf(dateUtc: string): Date {
  const year = Number(dateUtc.slice(0, 4))
  const month = Number(dateUtc.slice(5, 7))
  const day = Number(dateUtc.slice(8, 10))
  return new Date(Date.UTC(year, month - 1, day))
}

export function isoWeekKeyOf(dateUtc: string): string {
  const date = utcMidnightOf(dateUtc)
  const isoDay = date.getUTCDay() === 0 ? 7 : date.getUTCDay()
  date.setUTCDate(date.getUTCDate() + 4 - isoDay)
  const isoYear = date.getUTCFullYear()
  const yearStart = Date.UTC(isoYear, 0, 1)
  const week = Math.ceil(((date.getTime() - yearStart) / MS_PER_DAY + 1) / 7)
  return `${isoYear}-W${String(week).padStart(2, "0")}`
}

export function monthKeyOf(dateUtc: string): string {
  return dateUtc.slice(0, 7)
}

export interface PeriodAnchors {
  readonly weekAnchors: ReadonlyMap<string, BackupCandidate>
  readonly monthAnchors: ReadonlyMap<string, BackupCandidate>
}

export function periodAnchorsOf(
  backups: readonly BackupCandidate[],
  todayUtc: string
): PeriodAnchors {
  const sorted = backups
    .filter((backup) => backup.status === "DONE")
    .toSorted((a, b) => a.beginTimeIso.localeCompare(b.beginTimeIso))

  const currentWeek = isoWeekKeyOf(todayUtc)
  const currentMonth = monthKeyOf(todayUtc)

  const weekAnchors = new Map<string, BackupCandidate>()
  const monthAnchors = new Map<string, BackupCandidate>()
  for (const backup of sorted) {
    const date = backup.beginTimeIso.slice(0, 10)
    const weekKey = isoWeekKeyOf(date)
    if (weekKey < currentWeek && !weekAnchors.has(weekKey)) weekAnchors.set(weekKey, backup)
    const monthKey = monthKeyOf(date)
    if (monthKey < currentMonth && !monthAnchors.has(monthKey)) monthAnchors.set(monthKey, backup)
  }

  return { weekAnchors, monthAnchors }
}

function previousWeekKeys(todayUtc: string, count: number): readonly string[] {
  const cursor = utcMidnightOf(todayUtc)
  const isoDay = cursor.getUTCDay() === 0 ? 7 : cursor.getUTCDay()
  cursor.setUTCDate(cursor.getUTCDate() - (isoDay - 1))
  const keys: string[] = []
  for (let i = 0; i < count; i++) {
    cursor.setUTCDate(cursor.getUTCDate() - 7)
    keys.push(isoWeekKeyOf(cursor.toISOString().slice(0, 10)))
  }
  return keys
}

function previousMonthKeys(todayUtc: string, count: number): readonly string[] {
  const year = Number(todayUtc.slice(0, 4))
  const month = Number(todayUtc.slice(5, 7))
  const keys: string[] = []
  for (let i = 1; i <= count; i++) {
    keys.push(monthKeyOf(new Date(Date.UTC(year, month - 1 - i, 1)).toISOString().slice(0, 10)))
  }
  return keys
}

function missingAnchorDisagreements(
  input: DecideKeepInput,
  weekAnchors: ReadonlyMap<string, BackupCandidate>,
  monthAnchors: ReadonlyMap<string, BackupCandidate>
): readonly KeepDisagreement[] {
  const doneDates = input.backups
    .filter((backup) => backup.status === "DONE")
    .map((backup) => backup.beginTimeIso.slice(0, 10))
    .toSorted()
  const earliestDate = doneDates[0]
  if (earliestDate === undefined) return []

  const earliestWeek = isoWeekKeyOf(earliestDate)
  const earliestMonth = monthKeyOf(earliestDate)
  const disagreements: KeepDisagreement[] = []

  for (const periodKey of previousWeekKeys(input.todayUtc, input.weeklyKeepCount)) {
    if (periodKey < earliestWeek || weekAnchors.has(periodKey)) continue
    disagreements.push({
      kind: "missing-anchor",
      periodKind: "weekly",
      periodKey,
      message: `completed week ${periodKey} has no surviving anchor within the weekly keep window — expected a DONE backup but found none (possible multi-day backup outage)`,
    })
  }
  for (const periodKey of previousMonthKeys(input.todayUtc, input.monthlyKeepCount)) {
    if (periodKey < earliestMonth || monthAnchors.has(periodKey)) continue
    disagreements.push({
      kind: "missing-anchor",
      periodKind: "monthly",
      periodKey,
      message: `completed month ${periodKey} has no surviving anchor within the monthly keep window — expected a DONE backup but found none (possible multi-day backup outage)`,
    })
  }
  return disagreements
}

export function decideKeepActions(input: DecideKeepInput): DecideKeepResult {
  const { weekAnchors, monthAnchors } = periodAnchorsOf(input.backups, input.todayUtc)

  const reasons = new Map<string, string[]>()
  const collectWindow = (
    anchors: ReadonlyMap<string, BackupCandidate>,
    count: number,
    label: string
  ): readonly string[] => {
    const ids: string[] = []
    for (const key of [...anchors.keys()].sort().reverse().slice(0, count)) {
      const backup = anchors.get(key)
      if (backup === undefined) continue
      ids.push(backup.backupId)
      const existing = reasons.get(backup.backupId) ?? []
      existing.push(`${label} anchor ${key}`)
      reasons.set(backup.backupId, existing)
    }
    return ids
  }

  const weeklyAnchors = collectWindow(weekAnchors, input.weeklyKeepCount, "weekly")
  const monthlyAnchors = collectWindow(monthAnchors, input.monthlyKeepCount, "monthly")
  const desired = new Set([...weeklyAnchors, ...monthlyAnchors])

  const disagreements: KeepDisagreement[] = []
  const untouchable = new Set<string>()
  for (const [backupId, state] of Object.entries(input.keepStates)) {
    if (state === "full") {
      untouchable.add(backupId)
      disagreements.push({
        kind: "backup",
        backupId,
        found: "full",
        message: `backup ${backupId} carries KEEP:full, which this controller never creates — left untouched, needs manual review`,
      })
    }
  }
  disagreements.push(...missingAnchorDisagreements(input, weekAnchors, monthAnchors))

  const marks: KeepAction[] = []
  for (const backupId of desired) {
    if (untouchable.has(backupId)) continue
    if (input.keepStates[backupId] === "standalone") continue
    marks.push({
      kind: "mark-standalone",
      backupId,
      reason: (reasons.get(backupId) ?? []).join("; "),
    })
  }

  const releases: KeepAction[] = Object.entries(input.keepStates)
    .filter(([backupId, state]) => state === "standalone" && !desired.has(backupId))
    .map(([backupId]) => backupId)
    .sort()
    .map((backupId) => ({
      kind: "release",
      backupId,
      reason: "outside the weekly and monthly keep windows",
    }))

  return { actions: [...marks, ...releases], weeklyAnchors, monthlyAnchors, disagreements }
}
