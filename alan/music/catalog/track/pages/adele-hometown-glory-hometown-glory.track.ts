import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adeleHometownGloryHometownGlory = {
  id: "01a0d52b-c25a-70b5-8838-47be347946a5",
  type: "page-type/track",
  slug: "adele-hometown-glory-hometown-glory",
  ownLength: 3.6493333333333333,
  ownProgress: 3.6493333333333333,
  partOfCollections: ["release/adele-hometown-glory"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hometown Glory",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "hometownglory|4dpARuHxo51G3z768sgnrY|218960",
  song: "song/adele-hometown-glory",
  carriedBy: [
    {
      release: "release/adele-hometown-glory",
      discNumber: 1,
      position: 1,
      externalId: "5UrwEPYUW7zLUcHdSaD4zT",
      externalLink: "https://open.spotify.com/track/5UrwEPYUW7zLUcHdSaD4zT",
    },
  ],
} as const satisfies Track
