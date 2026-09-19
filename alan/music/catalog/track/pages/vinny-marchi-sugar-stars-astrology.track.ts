import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsAstrology = {
  id: "01a0b112-92c9-71ab-9aaa-1d48335d57d7",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-astrology",
  ownLength: 3.36105,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5NCBxoj38ZZpLLIu9x2iPi",
      externalLink: "https://open.spotify.com/track/5NCBxoj38ZZpLLIu9x2iPi",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "astrology",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "astrology|5USAMqcbMAzF3HBmeD5pJF|201663",
  song: "song/vinny-marchi-astrology",
} as const satisfies Track
