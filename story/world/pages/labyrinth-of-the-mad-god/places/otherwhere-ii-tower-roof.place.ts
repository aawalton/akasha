import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiTowerRoof = {
  id: "01a0e9bb-b06e-7901-9265-9cf8f775c272",
  type: "page-type/place",
  slug: "otherwhere-ii-tower-roof",
  title: "The Roof of the Tower",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-tower-of-rizzen",
  facts: [
    {
      fact: "The roof is a flat stone circle half a mile across under a starry sky without atmosphere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A colossal machine face climbs the tower's side and rings the rim with portals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clockwork beasts, then soldiers, then thirty-foot giants pour out in timed phases.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Destroying a portal feeds its power to the Guardian.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Guardian is a tier-2 clockwork warrior with a gear-studded staff that changes shape.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:36:26.862Z",
  updatedAt: "2026-09-28T22:30:51.000Z",
} as const satisfies Place
