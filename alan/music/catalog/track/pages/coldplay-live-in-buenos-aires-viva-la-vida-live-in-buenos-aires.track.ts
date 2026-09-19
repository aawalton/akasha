import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresVivaLaVidaLiveInBuenosAires = {
  id: "01a0b9ee-d377-7243-bd78-3cacc0918ab8",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-viva-la-vida-live-in-buenos-aires",
  ownLength: 4.184433333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Y9lVjRD82aJOQ2v13UIoF",
      externalLink: "https://open.spotify.com/track/4Y9lVjRD82aJOQ2v13UIoF",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Viva La Vida - Live in Buenos Aires",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "vivalavidaliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|251066",
} as const satisfies Track
