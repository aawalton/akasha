import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2BelieveThePartingGlass = {
  id: "01a0abea-70b7-7b90-9895-f87c42219aa9",
  type: "page-type/track",
  slug: "celtic-woman-2-believe-the-parting-glass",
  ownLength: 4.201333333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-believe"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "53XAzgJesw8q5R884G6FPE",
      externalLink: "https://open.spotify.com/track/53XAzgJesw8q5R884G6FPE",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Parting Glass",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0bcumn1QlNcVagBgOAvPLU", artistName: "Shaun Davey" },
    { externalId: "4XeAMQYA8376n4ua0sEMxp", artistName: "Kirk Jones" },
    { externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" },
    { externalId: "4Jl3FibWLX8mi6TtTryovX", artistName: "David Downes" },
    { externalId: "2fJCHSiF0CwzZ2vuYWtt2p", artistName: "Nick Ingman" },
  ],
  trackKey:
    "thepartingglass|0bcumn1QlNcVagBgOAvPLU,2fJCHSiF0CwzZ2vuYWtt2p,4Jl3FibWLX8mi6TtTryovX,4XeAMQYA8376n4ua0sEMxp,6NWtt9pNOL2Gx7kBykdE5x|252080",
  song: "song/celtic-woman-the-parting-glass",
} as const satisfies Track
