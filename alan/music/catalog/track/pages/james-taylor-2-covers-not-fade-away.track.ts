import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversNotFadeAway = {
  id: "01a0abeb-350d-715a-87c6-1cc94671b456",
  type: "page-type/track",
  slug: "james-taylor-2-covers-not-fade-away",
  ownLength: 2.7624333333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-covers"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7t5fb6craNhAoPuz4dbIkE",
      externalLink: "https://open.spotify.com/track/7t5fb6craNhAoPuz4dbIkE",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Not Fade Away",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "notfadeaway|0vn7UBvSQECKJm2817Yf1P|165746",
  song: "song/james-taylor-not-fade-away",
} as const satisfies Track
