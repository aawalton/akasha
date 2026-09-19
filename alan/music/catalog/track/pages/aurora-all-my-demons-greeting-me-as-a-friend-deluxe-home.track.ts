import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraAllMyDemonsGreetingMeAsAFriendDeluxeHome = {
  id: "01a0b637-fcdb-78bc-947e-a2816aa6d80c",
  type: "page-type/track",
  slug: "aurora-all-my-demons-greeting-me-as-a-friend-deluxe-home",
  ownLength: 3.5462166666666666,
  ownProgress: 0,
  partOfCollections: ["release/aurora-all-my-demons-greeting-me-as-a-friend-deluxe"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6IArfwclYh8uNtQlMqqj2t",
      externalLink: "https://open.spotify.com/track/6IArfwclYh8uNtQlMqqj2t",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Home",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "home|1WgXqy2Dd70QQOU7Ay074N|212773",
  song: "song/aurora-home",
} as const satisfies Track
