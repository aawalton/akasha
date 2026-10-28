import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const violetEvergardenS01e01 = {
  id: "01a183d5-4981-7811-9f56-e8517b1078ce",
  type: "page-type/episode",
  slug: "violet-evergarden-s01e01",
  description:
    "Hodgins retrieves Violet from the hospital, as Major Gilbert asked him to look out for her. After they meet Gilbert's relatives, he offers her a job.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/violet-evergarden-season-1"],
  position: 1,
  publishedAt: "2018-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1395818",
      externalLink: "https://www.themoviedb.org/tv/75214/season/1/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  stillPath: "/kKfAt3rIuvMIEUVK4zeLj34PREf.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:45:55.713Z",
  updatedAt: "2026-10-28T18:45:55.713Z",
} as const satisfies Episode
