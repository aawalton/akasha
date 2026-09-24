import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiHabaneraHabanera = {
  id: "01a0b112-97cb-70df-a04b-483fed1dbb50",
  type: "page-type/track",
  slug: "vinny-marchi-habanera-habanera",
  ownLength: 2.1803833333333333,
  ownProgress: 2.1803833333333333,
  partOfCollections: ["release/vinny-marchi-habanera"],
  status: "completed",
  unit: "unit/minutes",
  title: "Habanera",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "habanera|5USAMqcbMAzF3HBmeD5pJF|130823",
  song: "song/vinny-marchi-habanera",
  carriedBy: [
    {
      release: "release/vinny-marchi-habanera",
      discNumber: 1,
      position: 1,
      externalId: "0YUjPFQEdInqgaZduX6UwV",
      externalLink: "https://open.spotify.com/track/0YUjPFQEdInqgaZduX6UwV",
    },
  ],
} as const satisfies Track
