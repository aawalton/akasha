import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXHarrowGreen = {
  id: "01a0eada-712f-7713-bdca-6db46bfb8771",
  type: "page-type/place",
  slug: "otherwhere-x-harrow-green",
  title: "Harrow Green",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-harrow",
  facts: [
    {
      fact: "Harrow Green is the open grass at the middle of the village, with the well and the bell post.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
    {
      fact: "The cottages ring the green, and the Sheaf and the Cranes' house face onto it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The bell post carries the dusk bell and the alarm, and is beside the Cranes' door.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The green is where Harrow gathers: for news, for musters, and for the harvest supper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sheaf supper sets trestles and barrels out on the green, with a fire at its middle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The supper's sport is quoits, a barrel race and wrestling, and the young folk enter all three.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Someone sings at the supper, and the rest of the year is judged by how that goes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On day one's night the sky over the green is clear and cold, with a half moon over the downs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "After a stir at the Sheaf, drinkers linger on the green in knots, watching the reeve's door.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-x-the-sheaf",
      way: "across the grass to the alehouse with the sheaf sign",
    },
    {
      to: "place/otherwhere-x-harrow",
      way: "out along the village street to the king's road",
    },
  ],
} as const satisfies Place
