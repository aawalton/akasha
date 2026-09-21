import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineRosesVersions = {
  id: "01a0676a-d728-7022-a22b-935ceb2f4627",
  type: "page-type/release",
  slug: "jenna-raine-roses-versions",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2024-08-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Dt6CTMbmNOH4C6xlQLQd5",
      externalLink: "https://open.spotify.com/album/3Dt6CTMbmNOH4C6xlQLQd5",
    },
  ],
  title: "Roses (Versions)",
} as const satisfies Release
