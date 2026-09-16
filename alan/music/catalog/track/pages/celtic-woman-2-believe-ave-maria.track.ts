import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2BelieveAveMaria = {
  id: "01a0abea-6fcb-742b-90fd-45ca5518e6ee",
  type: "page-type/track",
  slug: "celtic-woman-2-believe-ave-maria",
  ownLength: 4.3151,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-believe"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3IPxH1KPCR9g6xMMOjIaD6",
      externalLink: "https://open.spotify.com/track/3IPxH1KPCR9g6xMMOjIaD6",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ave Maria",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1U5zgr455OGyIkLNXvDdrf", artistName: "Traditional" },
    { externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" },
    { externalId: "4Jl3FibWLX8mi6TtTryovX", artistName: "David Downes" },
    { externalId: "2fJCHSiF0CwzZ2vuYWtt2p", artistName: "Nick Ingman" },
  ],
  trackKey:
    "avemaria|1U5zgr455OGyIkLNXvDdrf,2fJCHSiF0CwzZ2vuYWtt2p,4Jl3FibWLX8mi6TtTryovX,6NWtt9pNOL2Gx7kBykdE5x|258906",
} as const satisfies Track
