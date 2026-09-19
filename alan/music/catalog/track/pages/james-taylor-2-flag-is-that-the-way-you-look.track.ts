import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagIsThatTheWayYouLook = {
  id: "01a0abeb-450b-7bf5-b2ca-5ed42a02f3e1",
  type: "page-type/track",
  slug: "james-taylor-2-flag-is-that-the-way-you-look",
  ownLength: 1.9611,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ZO2cyWuY147d7gjtzIZIU",
      externalLink: "https://open.spotify.com/track/0ZO2cyWuY147d7gjtzIZIU",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Is That the Way You Look?",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "isthatthewayyoulook|0vn7UBvSQECKJm2817Yf1P|117666",
  song: "song/james-taylor-is-that-the-way-you-look",
} as const satisfies Track
