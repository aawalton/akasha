import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnlyYouRemixesOnlyYouKreamRemix = {
  id: "01a0aa7c-4056-7a86-b196-2ba5646f4daf",
  type: "page-type/track",
  slug: "zara-larsson-only-you-remixes-only-you-kream-remix",
  ownLength: 3.4562166666666667,
  ownProgress: 3.4562166666666667,
  partOfCollections: ["release/zara-larsson-only-you-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Only You - KREAM Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }, { artistName: "KREAM" }],
  trackKey: "onlyyoukreamremix|0DdDnziut7wOo6cAYWVZC5,1Xylc3o4UrD53lo9CvFvVg|207373",
  song: "song/zara-larsson-only-you",
  carriedBy: [
    {
      release: "release/zara-larsson-only-you-remixes",
      discNumber: 1,
      position: 4,
      externalId: "5mMchLiMiVmZETS4sp0Yfk",
      externalLink: "https://open.spotify.com/track/5mMchLiMiVmZETS4sp0Yfk",
    },
  ],
} as const satisfies Track
