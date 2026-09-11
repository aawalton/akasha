import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const paladin = {
  id: "01a0657e-13b5-7268-9de9-07b55af3419c",
  type: "world-class",
  slug: "paladin",
  title: "Paladin",
  world: "the-wandering-inn",
  aliases: ["paladins"],
  references: "jsonl",
} as const satisfies WorldClass
