import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19Tired = {
  id: "01a0d52b-c259-7db2-9135-2807ca7c14d6",
  type: "page-type/track",
  slug: "adele-19-tired",
  ownLength: 4.314216666666667,
  ownProgress: 0,
  partOfCollections: ["release/adele-19"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Tired",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "tired|4dpARuHxo51G3z768sgnrY|258853",
  song: "song/adele-tired",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 11,
      externalId: "6ONMnNDySnCsJPBcXWNU05",
      externalLink: "https://open.spotify.com/track/6ONMnNDySnCsJPBcXWNU05",
    },
  ],
} as const satisfies Track
