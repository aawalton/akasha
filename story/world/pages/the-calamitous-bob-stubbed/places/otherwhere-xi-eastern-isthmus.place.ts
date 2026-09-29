import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiEasternIsthmus = {
  id: "01a0ea8a-7b79-7a88-b6c8-70629c99b572",
  type: "page-type/place",
  slug: "otherwhere-xi-eastern-isthmus",
  title: "The Eastern Isthmus",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-halluria",
  facts: [
    {
      fact: "The eastern isthmus, off Halluria's eastern tip, joins Param to the Nemeti lands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The eastern isthmus is about as wide as a city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The eastern isthmus is Param's only land link to another continent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nemeti hosts came over the eastern isthmus into Halluria ten years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Blue-skinned human refugees have fled west over the eastern isthmus to Param.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viziman traders sail to the lands beyond the eastern isthmus.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
