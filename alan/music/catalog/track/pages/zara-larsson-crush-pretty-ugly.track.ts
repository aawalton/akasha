import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonCrushPrettyUgly = {
  id: "01a0aa7c-3707-7967-ac79-3dc8af0c7595",
  type: "page-type/track",
  slug: "zara-larsson-crush-pretty-ugly",
  ownLength: 2.6449333333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-crush"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6xL5Gi6sbvHjB11FvxyRub",
      externalLink: "https://open.spotify.com/track/6xL5Gi6sbvHjB11FvxyRub",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Pretty Ugly",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "prettyugly|1Xylc3o4UrD53lo9CvFvVg|158696",
} as const satisfies Track
