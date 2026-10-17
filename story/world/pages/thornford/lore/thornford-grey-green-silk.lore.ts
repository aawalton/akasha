import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const thornfordGreyGreenSilk = {
  id: "01a14b76-9919-75ea-807d-90a0fe16d809",
  type: "page-type/lore",
  slug: "thornford-grey-green-silk",
  title: "The Grey-Green Silk",
  world: "world/thornford",
  about: "story-item/thornford-grey-green-silk",
  facts: [
    {
      fact: "The grey-green silk was woven in the Spring Court, across the ford.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "The silk shifts between grey and green as it moves, like new leaves in rain.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "The bolt holds enough silk for one gown, with about an arm's length to spare.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "The silk shrinks from cold iron: a steel needle will not pierce it on a day the sun does not show.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On a day the sun shows, a steel needle passes through the silk as through any silk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A needle of bone, silver or thorn passes through the silk on any day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shaestrel does not know the silk balks at steel; the fae sew with thorn and bone.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-17T20:03:46.072Z",
  updatedAt: "2026-10-17T20:03:46.072Z",
} as const satisfies Lore
