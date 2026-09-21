import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraAllMyDemonsGreetingMeAsAFriendDeluxeHome = {
  id: "01a0b637-fcdb-78bc-947e-a2816aa6d80c",
  type: "page-type/track",
  slug: "aurora-all-my-demons-greeting-me-as-a-friend-deluxe-home",
  ownLength: 3.5462166666666666,
  ownProgress: 3.5462166666666666,
  partOfCollections: [
    "release/aurora-all-my-demons-greeting-me-as-a-friend-deluxe",
    "release/aurora-for-the-humans-who-take-long-walks-in-the-forest",
  ],
  position: 10,
  status: "completed",
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
  carriedBy: [
    {
      release: "release/aurora-all-my-demons-greeting-me-as-a-friend-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "6IArfwclYh8uNtQlMqqj2t",
      externalLink: "https://open.spotify.com/track/6IArfwclYh8uNtQlMqqj2t",
    },
    {
      release: "release/aurora-for-the-humans-who-take-long-walks-in-the-forest",
      discNumber: 1,
      position: 3,
      externalId: "1xCoHZhrKBTc0euoVGwaIy",
      externalLink: "https://open.spotify.com/track/1xCoHZhrKBTc0euoVGwaIy",
    },
  ],
} as const satisfies Track
