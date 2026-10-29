import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e09 = {
  id: "01a1884b-ef7a-7a2c-8010-c359d65b7804",
  type: "page-type/episode",
  slug: "ncis-s18e09",
  description:
    "NCIS dives into the competitive world of food trucks after finding a man frozen to death in the back of one.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 9,
  publishedAt: "2021-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2704074",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/9",
    },
  ],
  title: "Winter Chill",
  episodeType: "standard",
  stillPath: "/kvZzkwynU8m1Ot9zQhV1VOPMJxn.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
