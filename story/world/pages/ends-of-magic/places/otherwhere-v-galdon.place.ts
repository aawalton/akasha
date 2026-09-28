import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVGaldon = {
  id: "01a0e9f9-26ec-72e5-9c01-b910698ee875",
  type: "page-type/place",
  slug: "otherwhere-v-galdon",
  title: "Galdon",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-ostren",
  facts: [
    {
      fact: "Galdon is an old port city, near Keihona in size, rebuilt in patches.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Galdon is the smallest of Ostren's major cities.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Blinded Mountain is a few hours from Galdon by carriage.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
