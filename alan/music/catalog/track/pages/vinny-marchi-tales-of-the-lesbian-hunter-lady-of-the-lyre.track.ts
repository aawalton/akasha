import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTalesOfTheLesbianHunterLadyOfTheLyre = {
  id: "01a0b112-9107-7eae-a908-aa8bbb62994f",
  type: "page-type/track",
  slug: "vinny-marchi-tales-of-the-lesbian-hunter-lady-of-the-lyre",
  ownLength: 2.59765,
  ownProgress: 2.59765,
  partOfCollections: ["release/vinny-marchi-tales-of-the-lesbian-hunter"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lady of the Lyre",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "ladyofthelyre|5USAMqcbMAzF3HBmeD5pJF|155859",
  song: "song/vinny-marchi-lady-of-the-lyre",
  carriedBy: [
    {
      release: "release/vinny-marchi-tales-of-the-lesbian-hunter",
      discNumber: 1,
      position: 1,
      externalId: "7yKYTBUeWuKaV2INlfzKgu",
      externalLink: "https://open.spotify.com/track/7yKYTBUeWuKaV2INlfzKgu",
    },
  ],
} as const satisfies Track
