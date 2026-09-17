import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTheLetGoTheLetGo = {
  id: "01a0b112-94d1-7ad9-bbae-ec7171c48980",
  type: "page-type/track",
  slug: "vinny-marchi-the-let-go-the-let-go",
  ownLength: 3.3539666666666665,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-the-let-go"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "22DPaemXvTGdABSZNGu1Au",
      externalLink: "https://open.spotify.com/track/22DPaemXvTGdABSZNGu1Au",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Let Go",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "theletgo|5USAMqcbMAzF3HBmeD5pJF|201238",
} as const satisfies Track
