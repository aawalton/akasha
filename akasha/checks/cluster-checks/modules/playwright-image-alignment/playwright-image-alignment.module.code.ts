import { z } from "zod"

const VERSION_GROUP_SCHEMA = z.object({ version: z.string() })

const MCR_PLAYWRIGHT_RE = /mcr\.microsoft\.com\/playwright:v(?<version>\d+\.\d+\.\d+)/g
const LOCK_PLAYWRIGHT_CORE_RE = /"playwright-core@(?<version>\d+\.\d+\.\d+)"/g

function allVersions(re: RegExp, text: string): readonly string[] {
  const versions: string[] = []
  for (const match of text.matchAll(re)) {
    const groups = VERSION_GROUP_SCHEMA.safeParse(match.groups)
    if (groups.success) versions.push(groups.data.version)
  }
  return versions
}

export function extractMcrPlaywrightVersions(text: string): readonly string[] {
  return allVersions(MCR_PLAYWRIGHT_RE, text)
}

export function extractLockPlaywrightCoreVersions(lockText: string): readonly string[] {
  return allVersions(LOCK_PLAYWRIGHT_CORE_RE, lockText)
}

export interface VersionReading {
  readonly source: string
  readonly version: string | null
}

export interface AlignmentViolation {
  readonly source: string
  readonly version: string | null
  readonly reason: string
}

export function computeAlignmentViolations(
  readings: readonly VersionReading[]
): readonly AlignmentViolation[] {
  const violations: AlignmentViolation[] = []
  const distinct = new Set<string>()
  for (const r of readings) {
    if (r.version !== null) distinct.add(r.version)
  }
  for (const r of readings) {
    if (r.version === null) {
      violations.push({
        source: r.source,
        version: null,
        reason: "no Playwright version found in a source that must declare one",
      })
    }
  }
  if (distinct.size > 1) {
    const list = [...distinct].sort().join(", ")
    for (const r of readings) {
      if (r.version === null) continue
      violations.push({
        source: r.source,
        version: r.version,
        reason: `Playwright versions diverge (${list}) — package.json pins, bun.lock, the dockerfile-extensions FROM tag, and the mirror list must all carry one exact version`,
      })
    }
  }
  return violations
}
