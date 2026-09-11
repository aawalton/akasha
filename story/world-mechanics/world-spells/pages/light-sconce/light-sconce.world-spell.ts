import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightSconce = {
  id: "01a06572-95ce-731f-8cb9-a0b7851cb1a4",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "light-sconce",
  title: "Light Sconce",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
