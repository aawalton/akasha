import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayChristmasLightsChristmasLights = {
  id: "01a0b9ee-fa5e-739b-98e7-f1ff41375b41",
  type: "page-type/track",
  slug: "coldplay-christmas-lights-christmas-lights",
  ownLength: 4.0415833333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-christmas-lights"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4fzyvSu73BhGvi96p2zwjL",
      externalLink: "https://open.spotify.com/track/4fzyvSu73BhGvi96p2zwjL",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Christmas Lights",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "christmaslights|4gzpq5DPGxSnKTe4SA8HAU|242495",
  song: "song/coldplay-christmas-lights",
} as const satisfies Track
