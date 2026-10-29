import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e11 = {
  id: "01a1884b-ef75-7f84-8ca5-714bc16b19a8",
  type: "page-type/episode",
  slug: "ncis-s14e11",
  description:
    "NCIS searches for new leads after an undercover operation to apprehend a businessman who uses acts of terror to manipulate the stock market is compromised.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 11,
  publishedAt: "2017-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1245637",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/11",
    },
  ],
  title: "Willoughby",
  episodeType: "standard",
  stillPath: "/pMsfwiS38OoGaG9lskyVbeBFurz.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
