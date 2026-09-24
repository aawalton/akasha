import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2BelieveBlackIsTheColour = {
  id: "01a0abea-6f7d-7b8d-a25d-bce7b484b1d8",
  type: "page-type/track",
  slug: "celtic-woman-2-believe-black-is-the-colour",
  ownLength: 3.7391,
  ownProgress: 3.7391,
  partOfCollections: ["release/celtic-woman-2-believe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Black Is The Colour",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Traditional" },
    { artist: "artist/celtic-woman" },
    { artistName: "David Downes" },
    { artistName: "Nick Ingman" },
  ],
  trackKey:
    "blackisthecolour|1U5zgr455OGyIkLNXvDdrf,2fJCHSiF0CwzZ2vuYWtt2p,4Jl3FibWLX8mi6TtTryovX,6NWtt9pNOL2Gx7kBykdE5x|224346",
  song: "song/celtic-woman-black-is-the-colour",
  carriedBy: [
    {
      release: "release/celtic-woman-2-believe",
      discNumber: 1,
      position: 7,
      externalId: "14DxJejYv2S2TjFNCjaZB9",
      externalLink: "https://open.spotify.com/track/14DxJejYv2S2TjFNCjaZB9",
    },
  ],
} as const satisfies Track
