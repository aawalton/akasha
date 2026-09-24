import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2BelieveNocturne = {
  id: "01a0abea-6ec0-7cfc-8ea4-4b5e34228c81",
  type: "page-type/track",
  slug: "celtic-woman-2-believe-nocturne",
  ownLength: 3.5613333333333332,
  ownProgress: 3.5613333333333332,
  partOfCollections: ["release/celtic-woman-2-believe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Nocturne",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Rolf Løvland" },
    { artistName: "Petter Skavlan" },
    { artist: "artist/celtic-woman" },
    { artistName: "David Downes" },
    { artistName: "Nick Ingman" },
  ],
  trackKey:
    "nocturne|0V0TbicIQ6nqAWy13mR4BH,2fJCHSiF0CwzZ2vuYWtt2p,4Jl3FibWLX8mi6TtTryovX,5DU6Lz0TTEUY8JBj2ywg9o,6NWtt9pNOL2Gx7kBykdE5x|213680",
  song: "song/celtic-woman-nocturne",
  carriedBy: [
    {
      release: "release/celtic-woman-2-believe",
      discNumber: 1,
      position: 2,
      externalId: "6xm02XAR7z3Yuh6yYSLiX6",
      externalLink: "https://open.spotify.com/track/6xm02XAR7z3Yuh6yYSLiX6",
    },
  ],
} as const satisfies Track
