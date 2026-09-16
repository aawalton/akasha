import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodAintMyFault = {
  id: "01a0aa7c-3378-7320-8741-34983ae3c3c2",
  type: "page-type/track",
  slug: "zara-larsson-so-good-aint-my-fault",
  ownLength: 3.74095,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ADG9OgdVTL7fgREP75BrZ",
      externalLink: "https://open.spotify.com/track/0ADG9OgdVTL7fgREP75BrZ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ain't My Fault",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "aintmyfault|1Xylc3o4UrD53lo9CvFvVg|224457",
} as const satisfies Track
