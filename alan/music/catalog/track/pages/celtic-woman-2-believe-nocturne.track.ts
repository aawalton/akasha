import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2BelieveNocturne = {
  id: "01a0abea-6ec0-7cfc-8ea4-4b5e34228c81",
  type: "page-type/track",
  slug: "celtic-woman-2-believe-nocturne",
  ownLength: 3.5613333333333332,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-believe"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6xm02XAR7z3Yuh6yYSLiX6",
      externalLink: "https://open.spotify.com/track/6xm02XAR7z3Yuh6yYSLiX6",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Nocturne",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0V0TbicIQ6nqAWy13mR4BH", artistName: "Rolf Løvland" },
    { externalId: "5DU6Lz0TTEUY8JBj2ywg9o", artistName: "Petter Skavlan" },
    { externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" },
    { externalId: "4Jl3FibWLX8mi6TtTryovX", artistName: "David Downes" },
    { externalId: "2fJCHSiF0CwzZ2vuYWtt2p", artistName: "Nick Ingman" },
  ],
  trackKey:
    "nocturne|0V0TbicIQ6nqAWy13mR4BH,2fJCHSiF0CwzZ2vuYWtt2p,4Jl3FibWLX8mi6TtTryovX,5DU6Lz0TTEUY8JBj2ywg9o,6NWtt9pNOL2Gx7kBykdE5x|213680",
} as const satisfies Track
