import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanGreedy = {
  id: "01a0a6c5-2bfc-711e-8780-a4ac42661549",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-greedy",
  ownLength: 3.5813333333333333,
  ownProgress: 3.5813333333333333,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Greedy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "greedy|66CXWjxzNUsdJxJ2JdwvnR|214880",
  song: "song/ariana-grande-greedy",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 7,
      externalId: "6tcLyhPrmBEPaQ1Yz4MdGy",
      externalLink: "https://open.spotify.com/track/6tcLyhPrmBEPaQ1Yz4MdGy",
    },
  ],
} as const satisfies Track
