import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonLikeItIsLikeItIs = {
  id: "01a0aa7c-3d7d-7044-8752-90ac3676d0e1",
  type: "page-type/track",
  slug: "zara-larsson-like-it-is-like-it-is",
  ownLength: 3.0511166666666667,
  ownProgress: 3.0511166666666667,
  partOfCollections: ["release/zara-larsson-like-it-is"],
  status: "completed",
  unit: "unit/minutes",
  title: "Like It Is",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Kygo" }, { artist: "artist/zara-larsson" }, { artistName: "Tyga" }],
  trackKey: "likeitis|1Xylc3o4UrD53lo9CvFvVg,23fqKkggKUBHNkbKtXEls4,5LHRHt1k9lMyONurDHEdrp|183067",
  song: "song/zara-larsson-like-it-is",
  carriedBy: [
    {
      release: "release/zara-larsson-like-it-is",
      discNumber: 1,
      position: 1,
      externalId: "3frUvGrmGcay91lvFbOgsN",
      externalLink: "https://open.spotify.com/track/3frUvGrmGcay91lvFbOgsN",
    },
  ],
} as const satisfies Track
