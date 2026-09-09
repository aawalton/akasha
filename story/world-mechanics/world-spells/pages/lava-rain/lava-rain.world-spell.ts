import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lavaRain = {
  id: "01a06572-95cc-7088-ae13-753e2723d097",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lava-rain",
  title: "Lava Rain",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
