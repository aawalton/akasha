import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1Secret = {
  id: "01a0aa7c-3540-7812-a42b-f5693a413350",
  type: "page-type/track",
  slug: "zara-larsson-1-secret",
  ownLength: 2.730916666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3SZRfIDIPKmwQ4Q5eELRgu",
      externalLink: "https://open.spotify.com/track/3SZRfIDIPKmwQ4Q5eELRgu",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Secret",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "secret|1Xylc3o4UrD53lo9CvFvVg|163855",
  song: "song/zara-larsson-secret",
} as const satisfies Track
