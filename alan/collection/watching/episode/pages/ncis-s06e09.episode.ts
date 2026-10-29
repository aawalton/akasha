import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e09 = {
  id: "01a1884b-ef69-7b77-8e37-bfa3017ef7d8",
  type: "page-type/episode",
  slug: "ncis-s06e09",
  description:
    "The team is forced to rely on information from questionable sources while trying to stop a criminal bent on stealing government secrets.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 9,
  publishedAt: "2008-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334413",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/9",
    },
  ],
  title: "Dagger",
  episodeType: "standard",
  stillPath: "/3TbG9mhWesSJGpTnZVkwqVXeNrE.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
