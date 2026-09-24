import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsAstrology = {
  id: "01a0b112-92c9-71ab-9aaa-1d48335d57d7",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-astrology",
  ownLength: 3.36105,
  ownProgress: 3.36105,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "astrology",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "astrology|5USAMqcbMAzF3HBmeD5pJF|201663",
  song: "song/vinny-marchi-astrology",
  carriedBy: [
    {
      release: "release/vinny-marchi-sugar-stars",
      discNumber: 1,
      position: 1,
      externalId: "5NCBxoj38ZZpLLIu9x2iPi",
      externalLink: "https://open.spotify.com/track/5NCBxoj38ZZpLLIu9x2iPi",
    },
  ],
} as const satisfies Track
