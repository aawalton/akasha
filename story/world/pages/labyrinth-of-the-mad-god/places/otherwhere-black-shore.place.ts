import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereBlackShore = {
  id: "01a0e984-b973-745d-b2f3-58c4e8c5e363",
  type: "page-type/place",
  slug: "otherwhere-black-shore",
  title: "The Black Shore",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-cinder-isle",
  facts: [
    {
      fact: "The Black Shore is a long beach of fine black sand on the west of Nala's tutorial island.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The sea off the Black Shore is blue shot through with faint swirls of rose and green.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    {
      fact: "The black sand holds the sun's heat and burns bare feet by midday.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    {
      fact: "Trees like palms, their leaves wrong for palms, line the top of the beach before thick forest.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    {
      fact: "A mountain rises from the island's middle, trailing a thin band of dark smoke.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    {
      fact: "No boat, road, wire, contrail or scrap of trash shows along the shore or in the sky.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    {
      fact: "Gulls cry over the surf, and small crabs run at the water's edge.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    { fact: "No fresh water runs on the open beach.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "The wet sand below the tide line stays cool underfoot even at midday.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wrack line of dried weed, shells and bleached driftwood runs along the top of the wet sand.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shards of black volcanic glass lie in the wrack, keen-edged enough to saw through cord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hand-sized crabs scuttle in the wash; they pinch hard and are good to eat cooked.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Under the fanpalms lie fallen nuts, most split or dry, perhaps one in a dozen still whole.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Northward the beach runs straight and open to a black headland, far off.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Southward, some two miles on, taller double rows of palms break the line of the trees.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nothing large comes onto the open sand by day but gulls, crabs and, at low tide, copperbacks.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
