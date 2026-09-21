import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraAllMyDemonsGreetingMeAsAFriendDeluxe = {
  id: "01a0676a-d716-7020-9d00-0513b4d3998c",
  type: "page-type/release",
  slug: "aurora-all-my-demons-greeting-me-as-a-friend-deluxe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2016-03-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "24CyXZHXgFPncdizaeTnSq",
      externalLink: "https://open.spotify.com/album/24CyXZHXgFPncdizaeTnSq",
    },
  ],
  title: "All My Demons Greeting Me as a Friend (Deluxe)",
} as const satisfies Release
