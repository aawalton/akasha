import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartment = {
  id: "01a0676a-d72e-7016-aa48-f99ebd7f5903",
  type: "page-type/release",
  slug: "taylor-swift-2-the-tortured-poets-department",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2024-04-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Mo4aZ8pdj6L1jx8zSwJnt",
      externalLink: "https://open.spotify.com/album/1Mo4aZ8pdj6L1jx8zSwJnt",
    },
  ],
  title: "THE TORTURED POETS DEPARTMENT",
} as const satisfies Release
