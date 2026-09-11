import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const javelinOfTheFrostGiant = {
  id: "01a06572-95cc-783a-81dd-ad716b49bbee",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "javelin-of-the-frost-giant",
  title: "Javelin of the Frost Giant",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
