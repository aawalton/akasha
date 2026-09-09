import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lightOrb = {
  id: "01a06572-95ce-7b8b-bcf4-b002fac15b59",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "light-orb",
  title: "Light Orb",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
