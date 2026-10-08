import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerTennesseeRain = {
  id: "01a0676a-d72c-700c-8725-d790595025e4",
  type: "page-type/release",
  slug: "jada-facer-tennessee-rain",
  title: "Tennessee Rain",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.1,
  ownProgress: 3.1,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-08-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "44trJ6nPB7yIQFFlWm3RDA",
      externalLink: "https://open.spotify.com/album/44trJ6nPB7yIQFFlWm3RDA",
    },
  ],
  createdAt: "2026-09-03T13:17:30.284Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
