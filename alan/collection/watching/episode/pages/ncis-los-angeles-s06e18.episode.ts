import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e18 = {
  id: "01a1884a-e0ee-7415-8180-9e4555a08f5a",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e18",
  description: "Following a successful sting, an explosion causes three FBI agents to be killed.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 18,
  publishedAt: "2015-03-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1045001",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/18",
    },
  ],
  title: "Fighting Shadows",
  episodeType: "standard",
  stillPath: "/sKweRKJTGo4vBBzeZsIbTiTrRqu.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
