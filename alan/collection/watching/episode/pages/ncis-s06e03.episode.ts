import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e03 = {
  id: "01a1884b-ef68-7356-9703-53a6ba49286a",
  type: "page-type/episode",
  slug: "ncis-s06e03",
  description:
    "A distinguished senator asks Gibbs for help in solving the murder of a young female Naval officer.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 3,
  publishedAt: "2008-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334407",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/3",
    },
  ],
  title: "Capitol Offense",
  episodeType: "standard",
  stillPath: "/5HQpkCHACOJWBb9gmLkvOmvUvb2.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
