import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiLadyOfTheLyreLadyOfTheLyre = {
  id: "01a0b112-9613-756b-b62a-c07cbbb32f42",
  type: "page-type/track",
  slug: "vinny-marchi-lady-of-the-lyre-lady-of-the-lyre",
  ownLength: 2.6,
  ownProgress: 2.6,
  partOfCollections: ["release/vinny-marchi-lady-of-the-lyre"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lady of the Lyre",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "ladyofthelyre|5USAMqcbMAzF3HBmeD5pJF|156000",
  song: "song/vinny-marchi-lady-of-the-lyre",
  carriedBy: [
    {
      release: "release/vinny-marchi-lady-of-the-lyre",
      discNumber: 1,
      position: 1,
      externalId: "146ypBBbb54MhXB4L0mO5A",
      externalLink: "https://open.spotify.com/track/146ypBBbb54MhXB4L0mO5A",
    },
  ],
} as const satisfies Track
