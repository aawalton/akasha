import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrialWorldWomb = {
  id: "01a18d10-93f1-7c98-a2de-434b266b09a3",
  type: "page-type/place",
  slug: "gifted-trial-world-womb",
  title: "The Womb",
  world: "world/gifted-trial-world",
  within: "place/gifted-trial-world-cult-hideout",
  depth: 0,
  exits: [
    { to: "place/gifted-trial-world-cult-birthing-room", way: "Birth, some five months on." },
  ],
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
    {
      fact: "Nala hears the chant muffled through the walls, many women's voices, in words she does not know.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Each morning the cult leaders talk beside her mother, and their muffled words reach Nala.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Place
