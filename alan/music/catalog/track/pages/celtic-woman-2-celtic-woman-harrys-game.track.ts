import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanHarrysGame = {
  id: "01a0abea-79ce-7675-9e9e-c71d4cabcbcb",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-harrys-game",
  ownLength: 2.50555,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4TrMDhDetsFAFXZKU004uW",
      externalLink: "https://open.spotify.com/track/4TrMDhDetsFAFXZKU004uW",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Harry's Game",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "harrysgame|6NWtt9pNOL2Gx7kBykdE5x|150333",
  song: "song/celtic-woman-harrys-game",
} as const satisfies Track
