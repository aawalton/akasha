import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const haikyuS03e04 = {
  id: "01a183d2-cc4b-76b2-a6bc-84e9cdee6b8a",
  type: "page-type/episode",
  slug: "haikyu-s03e04",
  description:
    "Thanks to Tsukki and Nishinoya's blocking, Karasuno comes back at the end of the second set. It is a heated battle in the end, resulting in multiple deuces... Who will score the final point?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/haikyu-season-3"],
  position: 4,
  publishedAt: "2016-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1239752",
      externalLink: "https://www.themoviedb.org/tv/60863/season/3/episode/4",
    },
  ],
  title: "The Halo Around the Moon",
  episodeType: "standard",
  stillPath: "/2aBwzsKdw5Pec9NOsyQrXQVT29T.jpg",
  voteAverage: 9.5,
  createdAt: "2026-10-28T18:43:12.581Z",
  updatedAt: "2026-10-28T18:43:12.581Z",
} as const satisfies Episode
