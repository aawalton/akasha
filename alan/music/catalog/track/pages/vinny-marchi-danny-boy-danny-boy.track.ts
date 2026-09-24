import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiDannyBoyDannyBoy = {
  id: "01a0b112-9a78-772d-8c4e-aa9ae8d9a53c",
  type: "page-type/track",
  slug: "vinny-marchi-danny-boy-danny-boy",
  ownLength: 2.997516666666667,
  ownProgress: 2.997516666666667,
  partOfCollections: ["release/vinny-marchi-danny-boy"],
  status: "completed",
  unit: "unit/minutes",
  title: "Danny Boy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "dannyboy|5USAMqcbMAzF3HBmeD5pJF|179851",
  song: "song/vinny-marchi-danny-boy",
  carriedBy: [
    {
      release: "release/vinny-marchi-danny-boy",
      discNumber: 1,
      position: 1,
      externalId: "2xWqyjYrRSTnuL2gd6Mp56",
      externalLink: "https://open.spotify.com/track/2xWqyjYrRSTnuL2gd6Mp56",
    },
  ],
} as const satisfies Track
