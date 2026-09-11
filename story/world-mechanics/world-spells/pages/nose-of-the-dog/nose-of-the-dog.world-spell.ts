import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const noseOfTheDog = {
  id: "01a06572-95d9-7d84-b3ef-c5237b5d43a9",
  type: "world-spell",
  slug: "nose-of-the-dog",
  title: "Nose of the Dog",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
