import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e04 = {
  id: "01a1884b-ef7a-72a4-a72f-968b2f08d5de",
  type: "page-type/episode",
  slug: "ncis-s18e04",
  description:
    "McGee and his wife Delilah's Bahamian vacation turns into a high-stakes mission when a case NCIS is tracking of a dead escape room manager has ties to the island.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 4,
  publishedAt: "2021-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2528710",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/4",
    },
  ],
  title: "Sunburn",
  episodeType: "standard",
  stillPath: "/bGGvSEAzPa6IlsM6YtC8wteZ6zw.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
