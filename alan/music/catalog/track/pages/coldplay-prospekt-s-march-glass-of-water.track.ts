import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayProspektSMarchGlassOfWater = {
  id: "01a0b9ee-fc3c-73b2-9be3-6b092088feaf",
  type: "page-type/track",
  slug: "coldplay-prospekt-s-march-glass-of-water",
  ownLength: 4.7484166666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-prospekt-s-march"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0WxY1PPhJBSfyWSPMgZWuQ",
      externalLink: "https://open.spotify.com/track/0WxY1PPhJBSfyWSPMgZWuQ",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Glass of Water",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "glassofwater|4gzpq5DPGxSnKTe4SA8HAU|284905",
  song: "song/coldplay-glass-of-water",
} as const satisfies Track
