import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS03e02 = {
  id: "01a18857-7c29-777d-ad09-b7dfb45a5f15",
  type: "page-type/episode",
  slug: "the-mandalorian-s03e02",
  description: "The Mandalorian and Grogu explore the ruins of a destroyed planet.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-3"],
  position: 2,
  publishedAt: "2023-03-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4237589",
      externalLink: "https://www.themoviedb.org/tv/82856/season/3/episode/2",
    },
  ],
  title: "Chapter 18: The Mines of Mandalore",
  episodeType: "standard",
  stillPath: "/yR3pIsArgHpyeGScXHKqj8hGRBo.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
