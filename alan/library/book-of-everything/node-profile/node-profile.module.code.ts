import { formatScore } from "../coverage-fold/coverage-fold.module.code.ts"

export type ProfileStatus = "live" | "resting" | "unopened"

export interface ProfileSeed {
  readonly node: string
  readonly d: number
  readonly c: number
  readonly calibration: string
  readonly updated: string
  readonly status: ProfileStatus
}

export function renderProfile(p: ProfileSeed): string {
  const calibrationLine = p.calibration === "" ? "calibration:" : `calibration: ${p.calibration}`
  return `---
node: ${p.node}
D: ${p.d}
C: ${formatScore(p.c)}
${calibrationLine}
updated: ${p.updated}
status: ${p.status}
---

## Frontier
<!-- Where his model thins — the edge located by the probe that set D. Becomes next session's bites. -->

## Integration
<!-- Which neighbors he connects this to, and how strongly — the live cross-links. -->

## Misconceptions caught
<!-- Wrong models surfaced and corrected, with the correction. Recurrence is a signal. -->

## Next bites
<!-- The small, specific things to study next, in rotation order. Where this thread left off. -->

## Evidence
<!-- The probe he cleared (bracketing D from below) and the one he didn't (from above). -->
`
}

function matchGroup(re: RegExp, input: string, label: string): string {
  const group = re.exec(input)?.[1]
  if (group === undefined) throw new Error(`no match for ${re} in ${label}`)
  return group
}

function frontmatter(content: string): string {
  return matchGroup(/^---\n([\s\S]*?)\n---/, content, "profile front-matter block")
}

export function readNumberField(content: string, key: string): number {
  const re = new RegExp(`^${key}:\\s*(-?\\d+(?:\\.\\d+)?)\\s*$`, "m")
  const raw = matchGroup(re, frontmatter(content), `front-matter field "${key}"`)
  const value = Number(raw)
  if (!Number.isFinite(value)) {
    throw new Error(`front-matter field "${key}" is not a number: ${raw}`)
  }
  return value
}

export function readStatusField(content: string): ProfileStatus {
  return matchGroup(
    /^status:\s*(live|resting|unopened)\s*$/m,
    frontmatter(content),
    'front-matter field "status"'
  ) as ProfileStatus
}

export function readNodeLabel(content: string): string {
  return matchGroup(/^node:\s*(.+?)\s*$/m, frontmatter(content), 'front-matter field "node"')
}

export function replaceComputedScore(content: string, c: number): string {
  const fm = frontmatter(content)
  if (!/^C:.*$/m.test(fm)) {
    throw new Error('profile front-matter has no "C:" line to update')
  }
  const nextC = `C: ${formatScore(c)}`
  const updatedFm = fm.replace(/^C:.*$/m, () => nextC)
  return content.replace(fm, () => updatedFm)
}

export function displayTitle(nodeLabel: string): string {
  const parts = nodeLabel.split("›")
  const last = parts[parts.length - 1]
  return (last ?? nodeLabel).trim()
}
