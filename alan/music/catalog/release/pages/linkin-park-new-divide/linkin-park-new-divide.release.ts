import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkNewDivide = {
  id: "01a0676a-d725-7050-8e1f-f581a8bbd3b6",
  type: "page-type/release",
  slug: "linkin-park-new-divide",
  title: "New Divide",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 17.811317,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-05-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zSLTDQZtXRZOAS9e0fiGM",
      externalLink: "https://open.spotify.com/album/4zSLTDQZtXRZOAS9e0fiGM",
    },
  ],
} as const satisfies Release
