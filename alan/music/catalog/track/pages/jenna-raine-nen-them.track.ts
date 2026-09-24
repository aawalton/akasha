import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineNenThem = {
  id: "01a0c621-294f-7e3b-9eba-0786a9365528",
  type: "page-type/track",
  slug: "jenna-raine-nen-them",
  ownLength: 3.5132,
  ownProgress: 3.5132,
  partOfCollections: ["release/jenna-raine-nen"],
  status: "completed",
  unit: "unit/minutes",
  title: "them",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jenna-raine" }],
  trackKey: "them|3aHe9rMa5HFTjXHw8tEz0A|210792",
  song: "song/jenna-raine-them",
  carriedBy: [
    {
      release: "release/jenna-raine-nen",
      discNumber: 1,
      position: 5,
      externalId: "26V7xQ2JjycqjzKw49cLMk",
      externalLink: "https://open.spotify.com/track/26V7xQ2JjycqjzKw49cLMk",
    },
  ],
} as const satisfies Track
