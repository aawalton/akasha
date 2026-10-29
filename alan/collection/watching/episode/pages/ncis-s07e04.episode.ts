import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e04 = {
  id: "01a1884b-ef6a-7f48-9efa-ef926b2b14ca",
  type: "page-type/episode",
  slug: "ncis-s07e04",
  description:
    "When a Marine's body surfaces halfway around the world, the investigation forces Ziva to dig up a buried chapter of her life.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 4,
  publishedAt: "2009-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334546",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/4",
    },
  ],
  title: "Good Cop, Bad Cop",
  episodeType: "standard",
  stillPath: "/e2QxPAtz8WJGyV1Ak1vkI5g6Jlj.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
