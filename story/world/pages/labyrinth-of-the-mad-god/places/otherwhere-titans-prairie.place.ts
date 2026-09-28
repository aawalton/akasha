import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereTitansPrairie = {
  id: "01a0e9bc-75a1-7b1c-8ea4-12fd49a8453d",
  type: "page-type/place",
  slug: "otherwhere-titans-prairie",
  title: "The Titans' Prairie",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Titans' Prairie is a world of violet sky, a fat green sun and lime-green light.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Porous red plateaus rise twenty thousand feet above an endless prairie of blue grass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Grass blades tower like skyscrapers, and cattle the size of cities graze among them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flying foxes lay pebble traps that fire air bullets and patch a barrier over the plateaus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rax hunt the giant herds for sport and can snatch people through gaps in the barrier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Time runs compressed here, so a month inside is a day outside.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
