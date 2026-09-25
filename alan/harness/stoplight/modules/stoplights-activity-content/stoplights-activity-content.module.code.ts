import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"

export type ActivityRows = readonly Readonly<Record<string, unknown>>[]

export interface ActivityGroup {
  readonly slug: string
  readonly rows: ActivityRows
  readonly wireKeyName: string
}

interface ActivityStoplight {
  readonly key: string
  readonly label: string
  readonly tier: string
  readonly reading: string | null
  readonly nextTier: string | null
  readonly progress: number | null
  readonly readingHeld: string | null
}

const TAKEN_AT = "takenAt"

export type StoplightsContent = Readonly<Record<string, readonly ActivityStoplight[] | string>>

function numberIn(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

export function stoplightsIn(rows: ActivityRows, wireKey: string): readonly ActivityStoplight[] {
  const held: ActivityStoplight[] = []
  for (const row of rows) {
    const key = textIn(row[wireKey])
    const tier = textIn(row.tier)
    if (key === null || tier === null) continue
    held.push({
      key,
      label: textIn(row.label) ?? key,
      tier,
      reading: textIn(row.reading),
      nextTier: textIn(row.nextTier),
      progress: numberIn(row.progress),
      readingHeld: textIn(row.readingHeld),
    })
  }
  return held
}

export function contentOf(groups: readonly ActivityGroup[], takenAt: string): StoplightsContent {
  const content: Record<string, readonly ActivityStoplight[] | string> = {}
  for (const group of groups) content[group.slug] = stoplightsIn(group.rows, group.wireKeyName)
  content[TAKEN_AT] = takenAt
  return content
}

export function stoplightsOf(
  content: StoplightsContent,
  groupSlug: string
): readonly ActivityStoplight[] {
  const held = content[groupSlug]
  return Array.isArray(held) ? held : []
}

function groupsIn(content: StoplightsContent): readonly string[] {
  return Object.keys(content)
    .filter((key) => key !== TAKEN_AT)
    .sort()
}

export function stoplightsCounted(content: StoplightsContent): number {
  return groupsIn(content).reduce((sum, slug) => sum + stoplightsOf(content, slug).length, 0)
}

export function readingSaid(content: StoplightsContent): string {
  return JSON.stringify(groupsIn(content).map((slug) => [slug, stoplightsOf(content, slug)]))
}
