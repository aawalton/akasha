import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonLushLifeTheRemixesLushLifeFrenchBraidsRemixExtended = {
  id: "01a0aa7c-27b9-737e-9e29-e35fc58a670d",
  type: "page-type/track",
  slug: "zara-larsson-lush-life-the-remixes-lush-life-french-braids-remix-extended",
  ownLength: 3.4075,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-lush-life-the-remixes"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1iYpuKTB4FQYfknu8SLx9Z",
      externalLink: "https://open.spotify.com/track/1iYpuKTB4FQYfknu8SLx9Z",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Lush Life - French Braids Remix [Extended]",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "5y8mGL7UFApHn1BotAfcj1", artistName: "French Braids" },
  ],
  trackKey:
    "lushlifefrenchbraidsremixextended|1Xylc3o4UrD53lo9CvFvVg,5y8mGL7UFApHn1BotAfcj1|204450",
  song: "song/zara-larsson-lush-life",
} as const satisfies Track
