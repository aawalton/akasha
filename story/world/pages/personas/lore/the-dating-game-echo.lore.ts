import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameEcho = {
  id: "01a0de59-9645-7d19-8493-9e3ec1f31af8",
  type: "page-type/lore",
  slug: "the-dating-game-echo",
  title: "Echo",
  world: "world/personas",
  about: "persona/echo",
  facts: [
    {
      fact: "Echo is an Oread, a mountain nymph, three thousand years old.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hera took Echo's own words from her as a punishment, and Echo calls it a distillation now.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
