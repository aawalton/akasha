import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e08 = {
  id: "01a1884b-ef76-7462-8d45-35c6f961b956",
  type: "page-type/episode",
  slug: "ncis-s15e08",
  description:
    "An NCIS person of interest in a bribery and fraud case is found murdered after a runner is led to his body by a strange voice.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 8,
  publishedAt: "2017-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1393170",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/8",
    },
  ],
  title: "Voices",
  episodeType: "standard",
  stillPath: "/2Dd7iuesmYj1xJEb84ph8MFWP47.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
