import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const hollowmereNala22 = {
  id: "01a101fd-3f70-7f71-905c-77932bb8109a",
  type: "page-type/lore",
  slug: "hollowmere-nala-2-2",
  title: "Nala, continued, continued",
  world: "world/hollowmere",
  about: "character-player/hollowmere-nala",
  facts: [
    {
      fact: "Nala called a thimble three feet across the bench, again and again, and her head stayed clear.",
      knowers: ["lore-disclosure/game-master", "character-player/hollowmere-nala"],
    },
  ],
} as const satisfies Lore
