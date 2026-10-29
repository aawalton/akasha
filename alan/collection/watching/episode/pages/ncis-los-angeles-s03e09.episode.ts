import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS03e09 = {
  id: "01a1884a-e0ea-7fc4-9354-e85b86d38fe4",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s03e09",
  description:
    "After Sam’s undercover mission in Sudan turns deadly, Callen and the NCIS team must track down their missing agent before it is too late.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-3"],
  position: 9,
  publishedAt: "2011-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557334",
      externalLink: "https://www.themoviedb.org/tv/17610/season/3/episode/9",
    },
  ],
  title: "Betrayal",
  episodeType: "standard",
  stillPath: "/6oSHwTzRZWTCI62IozkqNpLUgHM.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
