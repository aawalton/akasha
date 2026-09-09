import type { WorldSpell } from "../../world-spell.page-type.ts"

export const oilOrb = {
  id: "01a06572-95da-764a-b8cb-b469c9d40716",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "oil-orb",
  title: "Oil Orb",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
