import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreHarpyHare = {
  id: "01a0676a-d71f-7054-8acf-f29dba0b5757",
  type: "page-type/release",
  slug: "yaelokre-harpy-hare",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2024-01-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5YtN8x4Q8H7zEFroBn9yq0",
      externalLink: "https://open.spotify.com/album/5YtN8x4Q8H7zEFroBn9yq0",
    },
  ],
  title: "Harpy Hare",
} as const satisfies Release
