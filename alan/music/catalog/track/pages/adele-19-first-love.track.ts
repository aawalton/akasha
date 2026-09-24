import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19FirstLove = {
  id: "01a0d52b-c259-7a90-aae5-0c811df64648",
  type: "page-type/track",
  slug: "adele-19-first-love",
  ownLength: 3.171333333333333,
  ownProgress: 0,
  partOfCollections: ["release/adele-19"],
  status: "not-started",
  unit: "unit/minutes",
  title: "First Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "firstlove|4dpARuHxo51G3z768sgnrY|190280",
  song: "song/adele-first-love",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 7,
      externalId: "4I3FyrIM4E9I2MYm533VmJ",
      externalLink: "https://open.spotify.com/track/4I3FyrIM4E9I2MYm533VmJ",
    },
  ],
} as const satisfies Track
