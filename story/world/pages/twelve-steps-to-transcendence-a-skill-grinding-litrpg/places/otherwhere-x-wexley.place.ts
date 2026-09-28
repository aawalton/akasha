import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXWexley = {
  id: "01a0ea72-d93f-7427-9d35-3a7014c282fd",
  type: "page-type/place",
  slug: "otherwhere-x-wexley",
  title: "Wexley",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-sulon",
  facts: [
    {
      fact: "Wexley is a walled market town fifteen miles east of Harrow on the king's road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wexley holds market every fifth day; Harrow's carts go on the day before.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The next Wexley market falls on day five.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A gate warden at Wexley asks strangers for a road token and charges a copper toll.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wexley's magistrate sits in a hall on the market square and keeps an assessment tablet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Adventurer's Guild keeps a small post in Wexley with a board of paid work.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The guild board posts beast culls, escorts and errands, paid in silver.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrow's wolf pack is posted on the guild board with a bounty of two silver a pelt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A dealer on Tanner's Row sells essence shards at a silver each, and asks no questions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wexley has cobblers, a used-clothes stall, an inn called the Drover's Rest, and a bathhouse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A bed at the Drover's Rest costs six copper; a pair of plain boots about three silver.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A bookseller by the magistrate's hall sells primers, almanacs and old manuals dear.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wexley is the nearest town to Harrow; the nearest city is Aldermere, five days south-east.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-x-harrow",
      way: "west along the king's road, fifteen miles",
      direction: "west",
    },
  ],
} as const satisfies Place
