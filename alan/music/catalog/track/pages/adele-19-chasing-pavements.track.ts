import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19ChasingPavements = {
  id: "01a0d52b-c259-7eb5-ac81-f832c563c240",
  type: "page-type/track",
  slug: "adele-19-chasing-pavements",
  ownLength: 3.5084333333333335,
  ownProgress: 3.5084333333333335,
  partOfCollections: ["release/adele-19", "release/adele-chasing-pavements"],
  status: "completed",
  unit: "unit/minutes",
  title: "Chasing Pavements",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "chasingpavements|4dpARuHxo51G3z768sgnrY|210506",
  song: "song/adele-chasing-pavements",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 3,
      externalId: "56pHllZT7QOacB0bP56ofx",
      externalLink: "https://open.spotify.com/track/56pHllZT7QOacB0bP56ofx",
    },
    {
      release: "release/adele-chasing-pavements",
      discNumber: 1,
      position: 1,
      externalId: "3fLT97x5VBTi09GZeZbqwf",
      externalLink: "https://open.spotify.com/track/3fLT97x5VBTi09GZeZbqwf",
    },
  ],
} as const satisfies Track
