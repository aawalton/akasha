import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS05e02 = {
  id: "01a18843-982c-7495-9eec-5f754c82f0d5",
  type: "page-type/episode",
  slug: "black-mirror-s05e02",
  description:
    "A London rideshare driver ignites an international crisis when he kidnaps a worker from a social media company.",
  ownLength: 70,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-5"],
  position: 2,
  publishedAt: "2019-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1791584",
      externalLink: "https://www.themoviedb.org/tv/42009/season/5/episode/2",
    },
  ],
  title: "Smithereens",
  episodeType: "standard",
  stillPath: "/4uXgZa6K1d1wcGk4FtJUO1cCSqi.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
