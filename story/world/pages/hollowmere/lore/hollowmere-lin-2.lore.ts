import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const hollowmereLin2 = {
  id: "01a101b0-fb27-779a-ad56-7f5f1208741b",
  type: "page-type/lore",
  slug: "hollowmere-lin-2",
  title: "Lin, continued",
  world: "world/hollowmere",
  about: "character-other/hollowmere-lin",
  facts: [
    {
      fact: "At Nala's first life drawing Lin moved her wrist and told her: Look more. Draw less.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-lin",
        "character-player/hollowmere-nala",
      ],
    },
  ],
} as const satisfies Lore
