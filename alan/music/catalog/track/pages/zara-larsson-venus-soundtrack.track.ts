import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusSoundtrack = {
  id: "01a0aa7c-2bac-7ddb-80ab-30ddd9c6d5f1",
  type: "page-type/track",
  slug: "zara-larsson-venus-soundtrack",
  ownLength: 3.3849833333333335,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4CoavdV5PezJYz46loMF6q",
      externalLink: "https://open.spotify.com/track/4CoavdV5PezJYz46loMF6q",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Soundtrack",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "soundtrack|1Xylc3o4UrD53lo9CvFvVg|203099",
  song: "song/zara-larsson-soundtrack",
} as const satisfies Track
