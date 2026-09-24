import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19HometownGlory = {
  id: "01a0d52b-c259-7802-982a-bb545b62e9cb",
  type: "page-type/track",
  slug: "adele-19-hometown-glory",
  ownLength: 4.520433333333333,
  ownProgress: 0,
  partOfCollections: ["release/adele-19"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Hometown Glory",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "hometownglory|4dpARuHxo51G3z768sgnrY|271226",
  song: "song/adele-hometown-glory",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 12,
      externalId: "19QzuPTNZHJ2SEu5LCQTGI",
      externalLink: "https://open.spotify.com/track/19QzuPTNZHJ2SEu5LCQTGI",
    },
  ],
} as const satisfies Track
