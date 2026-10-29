import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS09e10 = {
  id: "01a1884a-e0f2-7222-9abd-ee7d4cfa7480",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s09e10",
  description:
    "The NCIS team tracks a highly skilled assailant determined to avenge her father's death by killing a Brazilian diplomat.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-9"],
  position: 10,
  publishedAt: "2017-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1398133",
      externalLink: "https://www.themoviedb.org/tv/17610/season/9/episode/10",
    },
  ],
  title: "Forasteira",
  episodeType: "standard",
  stillPath: "/mZSGEdBhYoF92zWI8t6uaXHgT5D.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
