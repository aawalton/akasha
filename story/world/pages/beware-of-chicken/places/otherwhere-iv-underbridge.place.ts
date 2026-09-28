import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvUnderbridge = {
  id: "01a0ea10-ad5a-7a67-93ff-a3f7ca15291c",
  type: "page-type/place",
  slug: "otherwhere-iv-underbridge",
  title: "Underbridge",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-grass-sea-city",
  facts: [
    {
      fact: "Underbridge (Qiao Xia) is the slum beneath Grass Sea City's great river bridges.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "More people live in Underbridge than in all of Verdant Hill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "North Underbridge (Bei Qiao Xia) has a stone archway entrance as tall as three men.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Underbridge is hot and humid; locals joke its rain is the sweat and breath of thousands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "City guards won't patrol Underbridge's alleys, so it keeps its own guard force.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Face Snatcher Gang, who wore victims' skinned faces as masks, once ruled Underbridge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Face Snatcher Gang drove the earlier Farrow Gang out of Underbridge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tanhui, a survivor of the Face Snatchers' purge, is the Boss of Underbridge's guard force.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tanhui works from the Community Meeting Hall and heads the Underbridge Restoration Commission.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tanhui's men were deputized as Azure Hills Militia once Xiulan vouched for their safety.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Minmin, Tanhui's sister, is Dong Chou's (Rags's) second-in-command, scarred by the Face Snatchers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lao is a young Underbridge thief who helped the Special Inspector expose the slaver ring.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
