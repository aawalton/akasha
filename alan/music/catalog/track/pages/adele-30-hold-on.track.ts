import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30HoldOn = {
  id: "01a0d52b-c25a-7eab-b53b-52318bc01efc",
  type: "page-type/track",
  slug: "adele-30-hold-on",
  ownLength: 6.100066666666667,
  ownProgress: 6.100066666666667,
  partOfCollections: ["release/adele-30"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hold On",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "holdon|4dpARuHxo51G3z768sgnrY|366004",
  song: "song/adele-hold-on",
  carriedBy: [
    {
      release: "release/adele-30",
      discNumber: 1,
      position: 10,
      externalId: "6bGMSP3H9YqkmaLnaJTIoF",
      externalLink: "https://open.spotify.com/track/6bGMSP3H9YqkmaLnaJTIoF",
    },
  ],
} as const satisfies Track
