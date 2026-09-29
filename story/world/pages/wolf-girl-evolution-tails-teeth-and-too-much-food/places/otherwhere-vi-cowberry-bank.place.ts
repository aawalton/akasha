import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViCowberryBank = {
  id: "01a0eaa0-39bf-72dc-b5e7-4bf603664e80",
  type: "page-type/place",
  slug: "otherwhere-vi-cowberry-bank",
  title: "The Cowberry Bank",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  within: "place/otherwhere-vi-hollow-stream",
  facts: [
    {
      fact: "The cowberry bank is a dry pine slope just below the wallow, on the stream's west side.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stone's throw upslope of the cowberries, a young spruce's boughs sweep the ground all round.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Under that spruce is a dry, windless bed of needles a hand deep, room for one curled up.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dry moss hangs in beards from the dead lower twigs of the pines around it, easy to strip.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wind comes down the valley from the north; the spruce's far side is out of it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Through the night only a fox comes near the spruce; it sniffs, barks once, and goes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Late in the night the wolf pack howls far off to the north-west, long and many-voiced.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Toward dawn frost silvers the bank; under the spruce the needles stay dry and unfrozen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At first light mist lies on the stream, and a wren scolds from the spruce's lower boughs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Day two dawns clear and still; the sun tops the valley's east rim about half past seven.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From half past seven, full sun lies on the open gravel below the bank until afternoon.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-vi-hollow-stream",
      way: "down the bank to the stream and on along it",
      direction: "south",
    },
  ],
} as const satisfies Place
