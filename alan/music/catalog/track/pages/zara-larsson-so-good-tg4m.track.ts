import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodTg4m = {
  id: "01a0aa7c-32b3-7cad-9f87-8cb4394a65e0",
  type: "page-type/track",
  slug: "zara-larsson-so-good-tg4m",
  ownLength: 2.8816,
  ownProgress: 2.8816,
  partOfCollections: ["release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "TG4M",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "tg4m|1Xylc3o4UrD53lo9CvFvVg|172896",
  song: "song/zara-larsson-tg4m",
  carriedBy: [
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 5,
      externalId: "4uoumbAMEMaKdtiv763jKz",
      externalLink: "https://open.spotify.com/track/4uoumbAMEMaKdtiv763jKz",
    },
  ],
} as const satisfies Track
