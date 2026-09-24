import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adeleSkyfallSkyfall = {
  id: "01a0d52b-c25a-7a78-89c1-ffa5406aa425",
  type: "page-type/track",
  slug: "adele-skyfall-skyfall",
  ownLength: 4.768016666666667,
  ownProgress: 4.768016666666667,
  partOfCollections: ["release/adele-skyfall"],
  status: "completed",
  unit: "unit/minutes",
  title: "Skyfall",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "skyfall|4dpARuHxo51G3z768sgnrY|286081",
  song: "song/adele-skyfall",
  carriedBy: [
    {
      release: "release/adele-skyfall",
      discNumber: 1,
      position: 1,
      externalId: "6VObnIkLVruX4UVyxWhlqm",
      externalLink: "https://open.spotify.com/track/6VObnIkLVruX4UVyxWhlqm",
    },
  ],
} as const satisfies Track
