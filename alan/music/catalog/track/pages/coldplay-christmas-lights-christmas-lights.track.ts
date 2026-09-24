import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayChristmasLightsChristmasLights = {
  id: "01a0b9ee-fa5e-739b-98e7-f1ff41375b41",
  type: "page-type/track",
  slug: "coldplay-christmas-lights-christmas-lights",
  ownLength: 4.0415833333333335,
  ownProgress: 4.0415833333333335,
  partOfCollections: ["release/coldplay-christmas-lights"],
  status: "completed",
  unit: "unit/minutes",
  title: "Christmas Lights",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "christmaslights|4gzpq5DPGxSnKTe4SA8HAU|242495",
  song: "song/coldplay-christmas-lights",
  carriedBy: [
    {
      release: "release/coldplay-christmas-lights",
      discNumber: 1,
      position: 1,
      externalId: "4fzyvSu73BhGvi96p2zwjL",
      externalLink: "https://open.spotify.com/track/4fzyvSu73BhGvi96p2zwjL",
    },
  ],
} as const satisfies Track
