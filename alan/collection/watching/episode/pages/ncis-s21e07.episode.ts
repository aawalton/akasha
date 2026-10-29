import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS21e07 = {
  id: "01a1884b-ef83-7dc3-bd8c-60401f3a908e",
  type: "page-type/episode",
  slug: "ncis-s21e07",
  description: "NCIS comes under attack by a mysterious enemy from the past.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-21"],
  position: 7,
  publishedAt: "2024-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5246314",
      externalLink: "https://www.themoviedb.org/tv/4614/season/21/episode/7",
    },
  ],
  title: "A Thousand Yards",
  episodeType: "standard",
  stillPath: "/qC1OWokEjK5zUIvqiZKIMFhFuKJ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
