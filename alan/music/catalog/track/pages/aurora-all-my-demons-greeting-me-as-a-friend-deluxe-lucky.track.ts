import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraAllMyDemonsGreetingMeAsAFriendDeluxeLucky = {
  id: "01a0b637-fbee-76f6-8c9e-71c51d405f74",
  type: "page-type/track",
  slug: "aurora-all-my-demons-greeting-me-as-a-friend-deluxe-lucky",
  ownLength: 4.224216666666667,
  ownProgress: 4.224216666666667,
  partOfCollections: ["release/aurora-all-my-demons-greeting-me-as-a-friend-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2XAQGXHYxF9pqeALHU2Rb7",
      externalLink: "https://open.spotify.com/track/2XAQGXHYxF9pqeALHU2Rb7",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Lucky",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "lucky|1WgXqy2Dd70QQOU7Ay074N|253453",
  song: "song/aurora-lucky",
  carriedBy: [
    {
      release: "release/aurora-all-my-demons-greeting-me-as-a-friend-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "2XAQGXHYxF9pqeALHU2Rb7",
      externalLink: "https://open.spotify.com/track/2XAQGXHYxF9pqeALHU2Rb7",
    },
  ],
} as const satisfies Track
