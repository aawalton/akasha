import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const theImpartialGazeOfIsthekenous = {
  id: "01a06572-95e6-7179-93f0-a22f2f1fb9af",
  type: "page-type/world-spell",
  slug: "the-impartial-gaze-of-isthekenous",
  title: "The Impartial Gaze of Isthekenous",
  world: "world/the-wandering-inn",
  aliases: ["THE IMPARTIAL GAZE OF ISTHEKENOUS"],
  references: "jsonl",
} as const satisfies WorldSpell
