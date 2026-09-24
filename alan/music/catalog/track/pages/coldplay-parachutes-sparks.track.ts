import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesSparks = {
  id: "01a0b9ee-e99b-7450-809e-5e372037bdff",
  type: "page-type/track",
  slug: "coldplay-parachutes-sparks",
  ownLength: 3.784883333333333,
  ownProgress: 3.784883333333333,
  partOfCollections: ["release/coldplay-parachutes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sparks",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "sparks|4gzpq5DPGxSnKTe4SA8HAU|227093",
  song: "song/coldplay-sparks",
  carriedBy: [
    {
      release: "release/coldplay-parachutes",
      discNumber: 1,
      position: 4,
      externalId: "7D0RhFcb3CrfPuTJ0obrod",
      externalLink: "https://open.spotify.com/track/7D0RhFcb3CrfPuTJ0obrod",
    },
  ],
} as const satisfies Track
