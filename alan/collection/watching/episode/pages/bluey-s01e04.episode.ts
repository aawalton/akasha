import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e04 = {
  id: "01a18843-d14c-7e83-b214-2e69d46230bc",
  type: "page-type/episode",
  slug: "bluey-s01e04",
  description:
    "Bluey and Bingo don't want to tidy the playroom, so they get Daddy Robot to do it for them. But when Bluey takes things too far, Daddy Robot malfunctions with disastrous results.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 4,
  publishedAt: "2018-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1583484",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/4",
    },
  ],
  title: "Daddy Robot",
  episodeType: "standard",
  stillPath: "/NytBQymaDFBK1NYFHeW7iThJ9w.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
