import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndSpedUp = {
  id: "01a0a6c5-34ca-76fb-b426-4d7529d25c0a",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-sped-up",
  ownLength: 3.231116666666667,
  ownProgress: 3.231116666666667,
  partOfCollections: ["release/ariana-grande-yes-and"],
  status: "completed",
  unit: "unit/minutes",
  title: "yes, and? - sped up",
  trackType: "version",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "yesandspedup|66CXWjxzNUsdJxJ2JdwvnR|193867",
  song: "song/ariana-grande-yes-and",
  carriedBy: [
    {
      release: "release/ariana-grande-yes-and",
      discNumber: 1,
      position: 4,
      externalId: "0eE0ymf1EjMk1ycmFO2cfH",
      externalLink: "https://open.spotify.com/track/0eE0ymf1EjMk1ycmFO2cfH",
    },
  ],
} as const satisfies Track
