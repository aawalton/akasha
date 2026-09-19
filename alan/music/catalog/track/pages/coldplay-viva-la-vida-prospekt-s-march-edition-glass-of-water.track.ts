import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEditionGlassOfWater = {
  id: "01a0b9ee-e17d-74dc-ae54-28e6da8c033b",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition-glass-of-water",
  ownLength: 4.7484166666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-prospekt-s-march-edition"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Y27miOkWnVymvOIA19BgU",
      externalLink: "https://open.spotify.com/track/0Y27miOkWnVymvOIA19BgU",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Glass of Water",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "glassofwater|4gzpq5DPGxSnKTe4SA8HAU|284905",
  song: "song/coldplay-glass-of-water",
} as const satisfies Track
