import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSangrad = {
  id: "01a0e9fb-fe36-73e7-b781-428071ab194c",
  type: "page-type/place",
  slug: "otherwhere-v-sangrad",
  title: "Sangrad",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-underworld",
  facts: [
    {
      fact: "Sangrad is a cavern-city in the underworld, set in a huge cave.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pillars of purple crystal hold up Sangrad's cavern.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Seal Fortress rises from the cavern floor up to an opening in its roof.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sangrad is a stronghold of Badud's grid.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sangrad is a major exporter of magical materials and goods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sangrad sends men-of-war out onto the surface oceans.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
