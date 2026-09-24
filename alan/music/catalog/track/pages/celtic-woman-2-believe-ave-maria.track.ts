import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2BelieveAveMaria = {
  id: "01a0abea-6fcb-742b-90fd-45ca5518e6ee",
  type: "page-type/track",
  slug: "celtic-woman-2-believe-ave-maria",
  ownLength: 4.3151,
  ownProgress: 4.3151,
  partOfCollections: ["release/celtic-woman-2-believe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ave Maria",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Traditional" },
    { artist: "artist/celtic-woman" },
    { artistName: "David Downes" },
    { artistName: "Nick Ingman" },
  ],
  trackKey:
    "avemaria|1U5zgr455OGyIkLNXvDdrf,2fJCHSiF0CwzZ2vuYWtt2p,4Jl3FibWLX8mi6TtTryovX,6NWtt9pNOL2Gx7kBykdE5x|258906",
  song: "song/celtic-woman-ave-maria",
  carriedBy: [
    {
      release: "release/celtic-woman-2-believe",
      discNumber: 1,
      position: 9,
      externalId: "3IPxH1KPCR9g6xMMOjIaD6",
      externalLink: "https://open.spotify.com/track/3IPxH1KPCR9g6xMMOjIaD6",
    },
  ],
} as const satisfies Track
