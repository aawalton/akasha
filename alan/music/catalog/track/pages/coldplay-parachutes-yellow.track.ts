import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesYellow = {
  id: "01a0b9ee-e9c4-7a3f-8a9f-2977122c9652",
  type: "page-type/track",
  slug: "coldplay-parachutes-yellow",
  ownLength: 4.4462166666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-parachutes"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3AJwUDP919kvQ9QcozQPxg",
      externalLink: "https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yellow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "yellow|4gzpq5DPGxSnKTe4SA8HAU|266773",
} as const satisfies Track
