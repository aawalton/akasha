import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e09 = {
  id: "01a1884b-ef76-7e7a-adda-ddbd725a7b25",
  type: "page-type/episode",
  slug: "ncis-s15e09",
  description:
    "The team tracks an elusive international arms dealer who recently murdered an MI6 officer.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 9,
  publishedAt: "2017-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1395723",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/9",
    },
  ],
  title: "Ready or Not",
  episodeType: "standard",
  stillPath: "/jeRulwIhlijg1TlsspeqvuNCu69.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
