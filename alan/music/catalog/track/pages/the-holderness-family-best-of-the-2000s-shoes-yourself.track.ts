import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sShoesYourself = {
  id: "01a0b4c6-ce1a-7cc4-96cc-d4f44159aac1",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-shoes-yourself",
  ownLength: 1.6188,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0tlRrL2aG3ktFrKMbBe9oq",
      externalLink: "https://open.spotify.com/track/0tlRrL2aG3ktFrKMbBe9oq",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Shoes Yourself",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "shoesyourself|6tITG4T8LpC0msapZ4wXGA|97128",
  song: "song/the-holderness-family-shoes-yourself",
} as const satisfies Track
