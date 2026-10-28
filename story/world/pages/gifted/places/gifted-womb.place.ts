import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedWomb = {
  id: "01a17f55-efd1-7551-9e74-470700fb8660",
  type: "page-type/place",
  slug: "gifted-womb",
  title: "The Womb",
  world: "world/gifted",
  within: "place/gifted-cult-hideout",
  depth: 0,
  exits: [{ to: "place/gifted-cult-birthing-room", way: "Birth, some five months on." }],
  facts: [
    {
      fact: "The womb is warm, wet and wholly dark, and a heartbeat thumps through it day and night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The unborn body in it is about four months grown, humanoid, small and barely able to move.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Through the walls come muffled voices, the mother's humming, and far-off chanting.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mother is a member of the demon cult and carries the child for its summoning.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Near ten on her first night, cult women gather round the mother and chant over her belly.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-27T21:48:20.815Z",
  updatedAt: "2026-10-28T00:34:09.148Z",
} as const satisfies Place
