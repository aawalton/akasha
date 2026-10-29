import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e19 = {
  id: "01a1884b-ef68-7180-b90a-08d0e101d31e",
  type: "page-type/episode",
  slug: "ncis-s05e19",
  description:
    "When one of their own is killed, the team must find the killer before they get to another member of the team, Gibbs. In an emotional investigation, the team tries to stay together, against the wishes of Assistant Director Vance.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 19,
  publishedAt: "2008-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334471",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/19",
    },
  ],
  title: "Judgment Day (2)",
  episodeType: "finale",
  stillPath: "/27s3yzeIFmTaP9XdAwT6vDDgfMl.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
