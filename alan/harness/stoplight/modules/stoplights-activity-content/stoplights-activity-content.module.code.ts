import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"

export const ACTIVITY_GROUPS = [
  { group: "upkeep", wireKey: "habit" },
  { group: "inboxes", wireKey: "inbox" },
  { group: "attributes", wireKey: "attribute" },
] as const

export type ActivityRows = readonly Readonly<Record<string, unknown>>[]

export interface ActivityStoplight {
  readonly key: string
  readonly label: string
  readonly tier: string
  readonly reading: string | null
  readonly nextTier: string | null
  readonly progress: number | null
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
    })
  }
  return held
}

export function contentOf(
  groups: readonly [ActivityRows, ActivityRows, ActivityRows],
  takenAt: string
): StoplightsContent {
  return {
    upkeep: stoplightsIn(groups[0], ACTIVITY_GROUPS[0].wireKey),
    inboxes: stoplightsIn(groups[1], ACTIVITY_GROUPS[1].wireKey),
    attributes: stoplightsIn(groups[2], ACTIVITY_GROUPS[2].wireKey),
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
