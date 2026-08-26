import type { DailyTierColor } from "./circle/tier/tier.ts"
import { resolveReadoutGroupLegend } from "./readout-resolver.ts"
import type { StoplightRing } from "./circle/circle.ts"
import { readReadoutGroupRings, type UpkeepArgs } from "./upkeep-stoplights.ts"

const INBOX_GROUP_SLUG = "inboxes"

const COLOR_GLYPH: Readonly<Record<DailyTierColor, string>> = {
  black: "⚫",
  red: "🔴",
  yellow: "🟡",
  green: "🟢",
  blue: "🔵",
}

export async function getInboxLegend(): Promise<string> {
  return resolveReadoutGroupLegend(INBOX_GROUP_SLUG)
}

export interface InboxStoplight extends StoplightRing {
  readonly inbox: string
  readonly label: string
}

export type InboxArgs = UpkeepArgs

export async function getInboxStoplightTiers(args: InboxArgs): Promise<readonly InboxStoplight[]> {
  return (await readReadoutGroupRings(INBOX_GROUP_SLUG, args)).map(({ key, ...rest }) => ({
    inbox: key,
    ...rest,
  }))
}

export async function getInboxStoplights(args: InboxArgs): Promise<string> {
  return (await getInboxStoplightTiers(args))
    .map((stoplight) => COLOR_GLYPH[stoplight.tier])
    .join("")
}
