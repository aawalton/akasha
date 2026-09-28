import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVEsebusCoastalMountains = {
  id: "01a0e9f6-e89c-77a2-ae1e-50524d48072f",
  type: "page-type/place",
  slug: "otherwhere-v-esebus-coastal-mountains",
  title: "The Coastal Mountains of Esebus",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-esebus-continent",
  facts: [
    {
      fact: "A mountain range runs along the barren coast, between the sea and the inland plains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The range is dotted with ruins and craters where Esebus has cleared dungeons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some cleared mountains in the range are now fields of rubble and glass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An intact Kalis conclave tower floats over a ruined mountain, having withstood Esebus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An abandoned dungeon-clearing camp has an earth-raised fort built for soldiers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beside that camp lies a graveyard of flat stone-set graves, maybe ten thousand of them.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
