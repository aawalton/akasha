import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartment = {
  id: "01a0676a-d72e-7016-aa48-f99ebd7f5903",
  type: "release",
  slug: "taylor-swift-2-the-tortured-poets-department",
  title: "THE TORTURED POETS DEPARTMENT",
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  ownLength: 65.26175,
  ownProgress: 65.26175,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-04-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Mo4aZ8pdj6L1jx8zSwJnt",
      externalLink: "https://open.spotify.com/album/1Mo4aZ8pdj6L1jx8zSwJnt",
    },
  ],
} as const satisfies Release
