import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesSpies = {
  id: "01a0b9ee-e974-7af0-8387-f7b771924ad1",
  type: "page-type/track",
  slug: "coldplay-parachutes-spies",
  ownLength: 5.312883333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-parachutes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2mLgOcRkEgq89j8WstUpui",
      externalLink: "https://open.spotify.com/track/2mLgOcRkEgq89j8WstUpui",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Spies",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "spies|4gzpq5DPGxSnKTe4SA8HAU|318773",
} as const satisfies Track
