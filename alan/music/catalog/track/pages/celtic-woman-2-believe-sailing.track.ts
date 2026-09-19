import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2BelieveSailing = {
  id: "01a0abea-6ee3-76b9-8865-31b27b56b147",
  type: "page-type/track",
  slug: "celtic-woman-2-believe-sailing",
  ownLength: 4.122433333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-believe"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0TDJpZ46CA64iDJSxYKJZX",
      externalLink: "https://open.spotify.com/track/0TDJpZ46CA64iDJSxYKJZX",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sailing",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3hrMT5rIVrS20YswyQ6nlj", artistName: "Gavin Sutherland" },
    { externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" },
    { externalId: "4Jl3FibWLX8mi6TtTryovX", artistName: "David Downes" },
    { externalId: "2fJCHSiF0CwzZ2vuYWtt2p", artistName: "Nick Ingman" },
  ],
  trackKey:
    "sailing|2fJCHSiF0CwzZ2vuYWtt2p,3hrMT5rIVrS20YswyQ6nlj,4Jl3FibWLX8mi6TtTryovX,6NWtt9pNOL2Gx7kBykdE5x|247346",
  song: "song/celtic-woman-sailing",
} as const satisfies Track
