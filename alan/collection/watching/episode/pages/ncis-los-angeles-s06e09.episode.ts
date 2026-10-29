import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e09 = {
  id: "01a1884a-e0ee-7e51-b6a4-d66ec697a0d9",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e09",
  description: "Eric is one of seven suspects after Granger is poisoned by the mole.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 9,
  publishedAt: "2014-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1017843",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/9",
    },
  ],
  title: "Traitor",
  episodeType: "standard",
  stillPath: "/f9n1rMAiHTCPgGSlxAPYK6cTOQO.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
