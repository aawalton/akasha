import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e17 = {
  id: "01a1884b-ef6a-7720-9603-fb44fb0a9ba2",
  type: "page-type/episode",
  slug: "ncis-s07e17",
  description:
    "Gibbs and the team investigate the shooting of a Marine and uncovers more to his life than anyone would have ever imagined.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 17,
  publishedAt: "2010-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334565",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/17",
    },
  ],
  title: "Double Identity",
  episodeType: "standard",
  stillPath: "/n6SwbahtxYR38mXgBWR1aJCAvgI.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
