import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameIris = {
  id: "01a0de59-9645-731f-b4d8-06b2e8e7b00b",
  type: "page-type/lore",
  slug: "the-dating-game-iris",
  title: "Iris",
  world: "world/personas",
  about: "persona/iris",
  facts: [
    {
      fact: "Iris is the messenger goddess, and blue status windows sometimes flicker near her.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-26T15:33:28.261Z",
  updatedAt: "2026-10-03T20:17:17.000Z",
} as const satisfies Lore
