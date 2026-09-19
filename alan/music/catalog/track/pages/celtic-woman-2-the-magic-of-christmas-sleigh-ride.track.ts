import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasSleighRide = {
  id: "01a0abea-5778-7835-b54b-5ef4f8f71f5f",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-sleigh-ride",
  ownLength: 3.58,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ChnF0KzShZflpbVmMWD8P",
      externalLink: "https://open.spotify.com/track/4ChnF0KzShZflpbVmMWD8P",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sleigh Ride",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "sleighride|6NWtt9pNOL2Gx7kBykdE5x|214800",
  song: "song/celtic-woman-sleigh-ride",
} as const satisfies Track
