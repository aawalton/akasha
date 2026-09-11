import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const antiMagicWard = {
  id: "01a06572-95b4-7480-a5b3-dd3da62f8a8e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "anti-magic-ward",
  title: "Anti-Magic Ward",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
