import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2BelieveBlackIsTheColour = {
  id: "01a0abea-6f7d-7b8d-a25d-bce7b484b1d8",
  type: "page-type/track",
  slug: "celtic-woman-2-believe-black-is-the-colour",
  ownLength: 3.7391,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-believe"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "14DxJejYv2S2TjFNCjaZB9",
      externalLink: "https://open.spotify.com/track/14DxJejYv2S2TjFNCjaZB9",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Black Is The Colour",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1U5zgr455OGyIkLNXvDdrf", artistName: "Traditional" },
    { externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" },
    { externalId: "4Jl3FibWLX8mi6TtTryovX", artistName: "David Downes" },
    { externalId: "2fJCHSiF0CwzZ2vuYWtt2p", artistName: "Nick Ingman" },
  ],
  trackKey:
    "blackisthecolour|1U5zgr455OGyIkLNXvDdrf,2fJCHSiF0CwzZ2vuYWtt2p,4Jl3FibWLX8mi6TtTryovX,6NWtt9pNOL2Gx7kBykdE5x|224346",
  song: "song/celtic-woman-black-is-the-colour",
} as const satisfies Track
