import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerConsequences = {
  id: "01a0676a-d71b-7023-95a3-40fbb83ca299",
  type: "release",
  slug: "jada-facer-consequences",
  title: "Consequences",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.35095,
  ownProgress: 2.35095,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-02-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0c7DowZ16x4Rh2NxY0iQdn",
      externalLink: "https://open.spotify.com/album/0c7DowZ16x4Rh2NxY0iQdn",
    },
  ],
} as const satisfies Release
