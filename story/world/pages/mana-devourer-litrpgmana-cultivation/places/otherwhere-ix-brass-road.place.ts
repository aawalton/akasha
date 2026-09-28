import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxBrassRoad = {
  id: "01a0ea3e-eaae-7ecc-8ef5-f219f00c4b8c",
  type: "page-type/place",
  slug: "otherwhere-ix-brass-road",
  title: "The Brass Road",
  world: "world/mana-devourer-litrpgmana-cultivation",
  facts: [
    {
      fact: "The Brass Road is the Kessen Zone's trade road, running east and west.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Brass Road runs from the yellow barrier's gate through Tollmere to Kessenhold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kessenhold is nine days east of Tollmere by the Brass Road at a caravan's pace.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Brass Road is packed earth and gravel, marked every mile by a brass-capped post.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orrow waystations sit about a day apart along the road; Tollmere is the westernmost.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Caravans pass along the Brass Road every few days, ox-drawn and guarded.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A walker without coin can sometimes earn a caravan ride by work.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bandits are rare on the Brass Road; catchers of the unclaimed are common.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hollowmanes seldom come onto the road itself, but hunt its edges after dark.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
