import type { WorldSpell } from "../../world-spell.page-type.ts"

export const dispelMagic = {
  id: "01a06572-95be-7347-ae9f-b4cac17363f0",
  pageTypeSlug: "world-spell",
  slug: "dispel-magic",
  title: "Dispel Magic",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
