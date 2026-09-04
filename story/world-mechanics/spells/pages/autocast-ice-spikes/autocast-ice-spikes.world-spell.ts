import type { WorldSpell } from "../../world-spell.page-type.ts"

export const autocastIceSpikes = {
  id: "01a06572-95b5-7d52-bfc5-884c21b26b7f",
  pageTypeSlug: "world-spell",
  slug: "autocast-ice-spikes",
  title: "Autocast: Ice Spikes",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
