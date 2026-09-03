import type { WorldSpell } from "../../world-spell.page-type.ts"

export const summonWaterGeyser = {
  id: "01a06572-95e4-7439-9b75-11c75087e94a",
  pageTypeSlug: "world-spell",
  slug: "summon-water-geyser",
  title: "Summon Water Geyser",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
