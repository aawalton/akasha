import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerExpert = {
  id: "01a0de1f-035c-72ac-b319-c0a1f8763330",
  type: "page-type/lore",
  slug: "the-tower-expert",
  title: "Expert",
  world: "world/personas",
  about: "tower-skill-rank/the-tower-expert",
  facts: [
    {
      fact: "Using a skill on what it was never drilled for, or fusing it with another, is strong expert work.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Such fusion is the first sign of a skill reaching toward grandmaster, and no rank of its own.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
  createdAt: "2026-09-26T14:29:29.564Z",
  updatedAt: "2026-09-26T18:13:39.000Z",
} as const satisfies Lore
