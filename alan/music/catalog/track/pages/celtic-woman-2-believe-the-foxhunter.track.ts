import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2BelieveTheFoxhunter = {
  id: "01a0abea-6f06-7966-8b0b-7316eca46252",
  type: "page-type/track",
  slug: "celtic-woman-2-believe-the-foxhunter",
  ownLength: 3.4766666666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-believe"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "684Lh6Sq5KG7tOMTfWoLA1",
      externalLink: "https://open.spotify.com/track/684Lh6Sq5KG7tOMTfWoLA1",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Foxhunter",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1U5zgr455OGyIkLNXvDdrf", artistName: "Traditional" },
    { externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" },
    { externalId: "4Jl3FibWLX8mi6TtTryovX", artistName: "David Downes" },
    { externalId: "2fJCHSiF0CwzZ2vuYWtt2p", artistName: "Nick Ingman" },
  ],
  trackKey:
    "thefoxhunter|1U5zgr455OGyIkLNXvDdrf,2fJCHSiF0CwzZ2vuYWtt2p,4Jl3FibWLX8mi6TtTryovX,6NWtt9pNOL2Gx7kBykdE5x|208600",
  song: "song/celtic-woman-the-foxhunter",
} as const satisfies Track
