import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLifeInTechnicolorIi = {
  id: "01a0676a-d723-702a-a5db-c1fff6004a75",
  type: "page-type/release",
  slug: "coldplay-life-in-technicolor-ii",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2009-01-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0He4NsgYFCODLfBKH0y3ln",
      externalLink: "https://open.spotify.com/album/0He4NsgYFCODLfBKH0y3ln",
    },
  ],
  title: "Life in Technicolor ii",
} as const satisfies Release
