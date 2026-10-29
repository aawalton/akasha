import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e08 = {
  id: "01a18853-1b88-7ad8-a8c3-c22e02f256b2",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e08",
  description:
    "When the U.S.S. Protostar is fractured in time by an anomaly, Hologram Janeway must synchronize the disjointed crew and save their ship before it destructs.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 8,
  publishedAt: "2022-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3448051",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/8",
    },
  ],
  title: "Time Amok",
  episodeType: "standard",
  stillPath: "/lv4GR9JZtiH8XeepDdRAWxO2ozr.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
