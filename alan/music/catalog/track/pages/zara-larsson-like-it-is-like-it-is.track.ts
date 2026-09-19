import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonLikeItIsLikeItIs = {
  id: "01a0aa7c-3d7d-7044-8752-90ac3676d0e1",
  type: "page-type/track",
  slug: "zara-larsson-like-it-is-like-it-is",
  ownLength: 3.0511166666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-like-it-is"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3frUvGrmGcay91lvFbOgsN",
      externalLink: "https://open.spotify.com/track/3frUvGrmGcay91lvFbOgsN",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Like It Is",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "23fqKkggKUBHNkbKtXEls4", artistName: "Kygo" },
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "5LHRHt1k9lMyONurDHEdrp", artistName: "Tyga" },
  ],
  trackKey: "likeitis|1Xylc3o4UrD53lo9CvFvVg,23fqKkggKUBHNkbKtXEls4,5LHRHt1k9lMyONurDHEdrp|183067",
  song: "song/zara-larsson-like-it-is",
} as const satisfies Track
