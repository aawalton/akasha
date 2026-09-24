import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodNeverForgetYou = {
  id: "01a0aa7c-32f5-703e-905d-f0284c4fa6b3",
  type: "page-type/track",
  slug: "zara-larsson-so-good-never-forget-you",
  ownLength: 3.5429,
  ownProgress: 3.5429,
  partOfCollections: ["release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Never Forget You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }, { artistName: "MNEK" }],
  trackKey: "neverforgetyou|1Xylc3o4UrD53lo9CvFvVg,7uMh23xWiuR7zsNkuNcm2G|212574",
  song: "song/zara-larsson-never-forget-you",
  carriedBy: [
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 7,
      externalId: "6hmhG1b4LEyNuashVvuIAo",
      externalLink: "https://open.spotify.com/track/6hmhG1b4LEyNuashVvuIAo",
    },
  ],
} as const satisfies Track
