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
      knowers: [
        "lore-disclosure/game-master",
        "character-other/thornford-shaestrel",
        "character-player/thornford-nala",
      ],
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
      fact: "A bone needle passes the silk but leaves a mark in it unless the needle is filed fine.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A blackthorn thorn passes the silk but snaps after a few stitches.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shaestrel does not know the silk balks at steel; the fae sew with thorn and bone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On the night of April 28 a steel needle would not pierce the silk, and bent against it.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "A birch-leaf stem pared to a point slips into the silk, but is too soft to sew and folds.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Birch sap leaves a dark green stain in the silk that will not lift.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "A thumbnail-sized sap stain sits at the cut end of the bolt, where Nala tried her stitches.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "The stained cut end lies within the spare arm's length, so the gown can be cut clear of it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-17T20:03:46.072Z",
  updatedAt: "2026-10-17T21:22:13.414Z",
} as const satisfies Lore
