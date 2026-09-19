import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyMoGhileMear = {
  id: "01a0abea-761c-72d4-8980-db2eb81e6f6c",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-mo-ghile-mear",
  ownLength: 4.832666666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6XjTvNDYStGdEHzVvBgYIV",
      externalLink: "https://open.spotify.com/track/6XjTvNDYStGdEHzVvBgYIV",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Mo Ghile Mear",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "moghilemear|6NWtt9pNOL2Gx7kBykdE5x|289960",
  song: "song/celtic-woman-mo-ghile-mear",
} as const satisfies Track
