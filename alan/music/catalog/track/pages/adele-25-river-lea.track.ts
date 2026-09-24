import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele25RiverLea = {
  id: "01a0d52b-c25a-7e2d-8cc8-ccbe24156bed",
  type: "page-type/track",
  slug: "adele-25-river-lea",
  ownLength: 3.7571,
  ownProgress: 0,
  partOfCollections: ["release/adele-25"],
  status: "not-started",
  unit: "unit/minutes",
  title: "River Lea",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "riverlea|4dpARuHxo51G3z768sgnrY|225426",
  song: "song/adele-river-lea",
  carriedBy: [
    {
      release: "release/adele-25",
      discNumber: 1,
      position: 7,
      externalId: "3hwu7jZD2TjvWCeHzNlgSE",
      externalLink: "https://open.spotify.com/track/3hwu7jZD2TjvWCeHzNlgSE",
    },
  ],
} as const satisfies Track
