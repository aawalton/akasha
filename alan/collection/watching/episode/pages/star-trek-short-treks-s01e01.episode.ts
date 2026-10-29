import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekShortTreksS01e01 = {
  id: "01a18853-28f0-72e3-a2f0-07bacb502736",
  type: "page-type/episode",
  slug: "star-trek-short-treks-s01e01",
  description:
    "Onboard the U.S.S. Discovery, Ensign Tilly encounters an unexpected visitor in need of help. However, this unlikely pair may have more in common than meets the eye.",
  ownLength: 15,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-short-treks-season-1"],
  position: 1,
  publishedAt: "2018-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1575312",
      externalLink: "https://www.themoviedb.org/tv/82491/season/1/episode/1",
    },
  ],
  title: "Runaway",
  episodeType: "standard",
  stillPath: "/r9YN95mngJFqbASySoh5h1nu81g.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:53.775Z",
  updatedAt: "2026-10-29T15:41:53.775Z",
} as const satisfies Episode
