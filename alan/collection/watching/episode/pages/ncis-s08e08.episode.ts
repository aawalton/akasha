import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e08 = {
  id: "01a1884b-ef6c-7a0b-bddc-0ab45cc93f07",
  type: "page-type/episode",
  slug: "ncis-s08e08",
  description:
    "The team is assigned to protect Ziva's father, when his attendance at a NCIS conference leads to some unexpected surprises.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 8,
  publishedAt: "2010-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334576",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/8",
    },
  ],
  title: "Enemies Foreign (1)",
  episodeType: "standard",
  stillPath: "/74EXpaqz5422T8px4eUv3O5zzyQ.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
