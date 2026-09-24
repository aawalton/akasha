import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsStarlight = {
  id: "01a0b112-942b-7459-b8f8-1ea31a12ebff",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-starlight",
  ownLength: 3.59615,
  ownProgress: 3.59615,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "Starlight",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "starlight|5USAMqcbMAzF3HBmeD5pJF|215769",
  song: "song/vinny-marchi-starlight",
  carriedBy: [
    {
      release: "release/vinny-marchi-sugar-stars",
      discNumber: 1,
      position: 11,
      externalId: "7zSsJjwbgJ6sSdBWNFUJkS",
      externalLink: "https://open.spotify.com/track/7zSsJjwbgJ6sSdBWNFUJkS",
    },
  ],
} as const satisfies Track
