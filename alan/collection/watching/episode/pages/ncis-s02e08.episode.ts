import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e08 = {
  id: "01a1884b-ef63-720c-a015-f8e248310cf9",
  type: "page-type/episode",
  slug: "ncis-s02e08",
  description:
    "A strange case for Gibbs and his team opens when a Navy Commander dies after successful surgery. While researching the commander's past, the team find out that he collected a lot of enemies lately.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 8,
  publishedAt: "2004-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334503",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/8",
    },
  ],
  title: "Heart Break",
  episodeType: "standard",
  stillPath: "/lgjPo9T9vaMKpiqpk6RlMNhYMqx.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
