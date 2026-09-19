import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2BelieveAwakening = {
  id: "01a0abea-6e9c-7518-8f63-59cfced5a7dc",
  type: "page-type/track",
  slug: "celtic-woman-2-believe-awakening",
  ownLength: 5.24755,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-believe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1akgc5nWDGeA2gKrm1Rj28",
      externalLink: "https://open.spotify.com/track/1akgc5nWDGeA2gKrm1Rj28",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Awakening",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4Jl3FibWLX8mi6TtTryovX", artistName: "David Downes" },
    { externalId: "4gpWwMQpb2Brtj1zqsJRBf", artistName: "Bary McCrea" },
    { externalId: "7mJ7vUZmcgRob2PKidv21k", artistName: "Caitríona Ní Dhuill" },
    { externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" },
    { externalId: "2fJCHSiF0CwzZ2vuYWtt2p", artistName: "Nick Ingman" },
  ],
  trackKey:
    "awakening|2fJCHSiF0CwzZ2vuYWtt2p,4Jl3FibWLX8mi6TtTryovX,4gpWwMQpb2Brtj1zqsJRBf,6NWtt9pNOL2Gx7kBykdE5x,7mJ7vUZmcgRob2PKidv21k|314853",
  song: "song/celtic-woman-awakening",
} as const satisfies Track
