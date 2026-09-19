import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonEndOfTimeEndOfTime = {
  id: "01a0aa7c-3ade-7279-b7cd-b05e871fc920",
  type: "page-type/track",
  slug: "zara-larsson-end-of-time-end-of-time",
  ownLength: 3.04155,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-end-of-time"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1r3uphR9yQTbDAzVDhWX6D",
      externalLink: "https://open.spotify.com/track/1r3uphR9yQTbDAzVDhWX6D",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "End Of Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "endoftime|1Xylc3o4UrD53lo9CvFvVg|182493",
  song: "song/zara-larsson-end-of-time",
} as const satisfies Track
