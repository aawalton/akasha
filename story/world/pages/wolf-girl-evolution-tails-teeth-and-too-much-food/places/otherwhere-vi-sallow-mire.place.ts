import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViSallowMire = {
  id: "01a0ea32-6dc1-7203-8c70-78c9d2c8f2cc",
  type: "page-type/place",
  slug: "otherwhere-vi-sallow-mire",
  title: "The Sallow Mire",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  within: "place/otherwhere-vi-greypine-weald",
  facts: [
    {
      fact: "The Sallow Mire is a reedy bog half a day's walk west of Moss Hollow, downhill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Mire's pools are brown and foul; its water sickens anyone who drinks it unboiled.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mudspitter toads, sludge rats and leeches swarm the Mire; slimes nest in its warm pools.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Mire's heart holds a named monster: Old Snapjaw, Mossbacked Elder, a Tier 1 turtle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Old Snapjaw is cart-sized, slow on land, deadly in water, and weak only at the neck.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sneezewort and bog myrtle grow thick on the Mire's firmer edges.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reeds for weaving and thatch grow tall along the Mire's rim.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
