import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineSleighRide = {
  id: "01a0676a-d729-7021-8e8c-23e213dd80c9",
  type: "page-type/release",
  slug: "jenna-raine-sleigh-ride",
  title: "Sleigh Ride",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 3.077417,
  ownProgress: 3.077417,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2019-12-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2IjuYVrT0axxsI0IQNoJAd",
      externalLink: "https://open.spotify.com/album/2IjuYVrT0axxsI0IQNoJAd",
    },
  ],
} as const satisfies Release
