import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS02e04 = {
  id: "01a1884b-3016-7c48-940a-6da9193e9f6f",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s02e04",
  description:
    "The NCIS team must determine why a murdered Navy drone pilot was using a black market drone to obtain military surveillance, and whether the drone’s footage is linked to his death.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-2"],
  position: 4,
  publishedAt: "2015-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1110111",
      externalLink: "https://www.themoviedb.org/tv/61387/season/2/episode/4",
    },
  ],
  title: "I Do",
  episodeType: "standard",
  stillPath: "/9wsWvbPwmEgNIlqwK654TCJIOBb.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
