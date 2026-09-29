import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvFeirelleGrove = {
  id: "01a0ed29-4e94-75c5-a8ad-3d23927b93e8",
  type: "page-type/place",
  slug: "overwhere-iv-feirelle-grove",
  title: "Feirelle Grove",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The Feirelle Grove is the elven homeland of the Feirelle branch, around its great tree.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hidden paths wind through the roots and tunnels of the Feirelle great tree.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Branch Head Loreleia Feirelle rules the grove, served by oathbound retainers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Feirelle symbol is the golden oak, and their treasures bear golden leaves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The spymaster Paeris runs the grove's agents and household from the shadows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The grove is linked by waypoint gate to Caelthal and the other groves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Feirelle elves trade seeds of fire-resistant cotton to Keld for rare metals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Princess Sylthaeryn Feirelle has left the grove and lives openly in Keld as envoy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The grove fears Outeatus assassins and Dornhallow traitors.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
