import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerExpert = {
  id: "01a0de1f-035c-72ac-b319-c0a1f8763330",
  type: "page-type/lore",
  slug: "the-tower-expert",
  title: "Expert",
  world: "world/personas",
  about: "tower-skill-rank/the-tower-expert",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Using a skill on what it was never drilled for, or fusing it with another, is strong expert work.",
    "Such fusion is the first sign of a skill reaching toward grandmaster, and no rank of its own.",
  ],
} as const satisfies Lore
