import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthology = {
  id: "01a0676a-d72e-7017-9f98-efa42800be43",
  type: "page-type/release",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2024-04-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5H7ixXZfsNMGbIE5OBSpcb",
      externalLink: "https://open.spotify.com/album/5H7ixXZfsNMGbIE5OBSpcb",
    },
  ],
  title: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
} as const satisfies Release
