import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"

export const ACTIVITY_GROUPS = ["upkeep", "inboxes", "attributes"] as const

export type ActivityRows = readonly Readonly<Record<string, unknown>>[]

export interface ActivityGroup {
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

export interface StoplightsContent {
  readonly upkeep: readonly ActivityStoplight[]
  readonly inboxes: readonly ActivityStoplight[]
  readonly attributes: readonly ActivityStoplight[]
  readonly takenAt: string
}

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

export function contentOf(
  groups: readonly [ActivityGroup, ActivityGroup, ActivityGroup],
  takenAt: string
): StoplightsContent {
  const [upkeep, inboxes, attributes] = groups
  return {
    upkeep: stoplightsIn(upkeep.rows, upkeep.wireKeyName),
    inboxes: stoplightsIn(inboxes.rows, inboxes.wireKeyName),
    attributes: stoplightsIn(attributes.rows, attributes.wireKeyName),
    takenAt,
  }
}

export function readingSaid(content: StoplightsContent): string {
  return JSON.stringify({
    upkeep: content.upkeep,
    inboxes: content.inboxes,
    attributes: content.attributes,
  })
}
