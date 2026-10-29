import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS14e15 = {
  id: "01a1884a-e0f7-7cea-9bcc-6ea903ffce55",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s14e15",
  description:
    "Sam Hanna must go undercover as a fighter to catch the leader of a gang dealing drugs on the streets",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-14"],
  position: 15,
  publishedAt: "2023-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4282324",
      externalLink: "https://www.themoviedb.org/tv/17610/season/14/episode/15",
    },
  ],
  title: "The Other Shoe",
  episodeType: "standard",
  stillPath: "/tJ90PUUCXkxJ5sfA7SJbETON2dt.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
