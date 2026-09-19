import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnlyYouRemixesOnlyYouKreamRemix = {
  id: "01a0aa7c-4056-7a86-b196-2ba5646f4daf",
  type: "page-type/track",
  slug: "zara-larsson-only-you-remixes-only-you-kream-remix",
  ownLength: 3.4562166666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-only-you-remixes"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5mMchLiMiVmZETS4sp0Yfk",
      externalLink: "https://open.spotify.com/track/5mMchLiMiVmZETS4sp0Yfk",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Only You - KREAM Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "0DdDnziut7wOo6cAYWVZC5", artistName: "KREAM" },
  ],
  trackKey: "onlyyoukreamremix|0DdDnziut7wOo6cAYWVZC5,1Xylc3o4UrD53lo9CvFvVg|207373",
  song: "song/zara-larsson-only-you",
} as const satisfies Track
