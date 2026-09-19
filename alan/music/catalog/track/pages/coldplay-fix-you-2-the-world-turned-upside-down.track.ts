import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayFixYou2TheWorldTurnedUpsideDown = {
  id: "01a0b9ee-ff82-7246-9735-5817c49ec6e2",
  type: "page-type/track",
  slug: "coldplay-fix-you-2-the-world-turned-upside-down",
  ownLength: 4.5437666666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-fix-you-2"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "29RjYJw9AahhQJaZgdPy2E",
      externalLink: "https://open.spotify.com/track/29RjYJw9AahhQJaZgdPy2E",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The World Turned Upside Down",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "theworldturnedupsidedown|4gzpq5DPGxSnKTe4SA8HAU|272626",
} as const satisfies Track
