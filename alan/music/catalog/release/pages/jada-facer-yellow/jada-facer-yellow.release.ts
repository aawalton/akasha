import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerYellow = {
  id: "01a0676a-d731-7048-855f-660189a0f476",
  type: "page-type/release",
  slug: "jada-facer-yellow",
  title: "Yellow",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.946667,
  ownProgress: 3.946667,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-04-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "65v33p7N8leWjxZM83KQqa",
      externalLink: "https://open.spotify.com/album/65v33p7N8leWjxZM83KQqa",
    },
  ],
  createdAt: "2026-09-03T13:17:30.289Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
