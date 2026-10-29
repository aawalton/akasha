import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e07 = {
  id: "01a1884b-ef67-78ba-a848-bd391c24a0d9",
  type: "page-type/episode",
  slug: "ncis-s05e07",
  description:
    "Gibbs finds himself emotionally challenged when he agrees to investigate a crime connected to a friend of his daughter, who passed away years ago, and the investigation leads to a shocking conclusion.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 7,
  publishedAt: "2007-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334460",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/7",
    },
  ],
  title: "Requiem",
  episodeType: "standard",
  stillPath: "/yidtGzNWtI3WBgy0FHkPdqA1mgY.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
