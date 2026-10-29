import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e10 = {
  id: "01a1884b-ef63-77e9-8fd5-7e22c8aaf1e8",
  type: "page-type/episode",
  slug: "ncis-s02e10",
  description:
    "Tony disappears while doing an undercover operation as an escaped prisoner who is forced to stick to a convict that owns a key to an expensive ancient Iraqi sculpture. The GPS locator that Abby planted on Tony stops working and the team are forced to find Tony before he gets murdered by the thief.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 10,
  publishedAt: "2004-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334505",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/10",
    },
  ],
  title: "Chained",
  episodeType: "mid-season",
  stillPath: "/3BbSjk60XEwczP5xxmMCRW8X8b1.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
