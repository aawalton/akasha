import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekShortTreksS02e01 = {
  id: "01a18853-28f0-7ca6-95aa-d21bef9d12a9",
  type: "page-type/episode",
  slug: "star-trek-short-treks-s02e01",
  description:
    "On his first day aboard the USS Enterprise, Ensign Spock and his new superior officer Number One get trapped in a turbolift.",
  ownLength: 14,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-short-treks-season-2"],
  position: 1,
  publishedAt: "2019-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1947027",
      externalLink: "https://www.themoviedb.org/tv/82491/season/2/episode/1",
    },
  ],
  title: "Q&A",
  episodeType: "standard",
  stillPath: "/c39cTNjSEVbMtRObFVNB6WSpfWk.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:41:53.775Z",
  updatedAt: "2026-10-29T15:41:53.775Z",
} as const satisfies Episode
