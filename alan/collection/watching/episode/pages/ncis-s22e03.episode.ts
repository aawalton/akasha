import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e03 = {
  id: "01a1884b-ef83-7455-818d-2fbd727aae8d",
  type: "page-type/episode",
  slug: "ncis-s22e03",
  description:
    "NCIS is called in to investigate when a Lieutenant returns home on the eve of Halloween to find a surprise party being thrown for someone else at his place.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 3,
  publishedAt: "2024-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5651798",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/3",
    },
  ],
  title: "The Trouble with Hal",
  episodeType: "standard",
  stillPath: "/oTYd7lwkxI3E4JthhLXhgkUrjvT.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
