import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e03 = {
  id: "01a1884a-e0ee-78b5-9132-fc11e6d37c51",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e03",
  description:
    "The Department of Justice target a member of the team. Leon delivers unsettling news to Hetty.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 3,
  publishedAt: "2014-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010229",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/3",
    },
  ],
  title: "Praesidium",
  episodeType: "standard",
  stillPath: "/50A30U1ZYpbl0SrZThGsRQI2CRU.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
