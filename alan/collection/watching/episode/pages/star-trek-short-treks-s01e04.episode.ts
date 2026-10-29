import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekShortTreksS01e04 = {
  id: "01a18853-28f0-7ec3-a28c-9e32f31c32b6",
  type: "page-type/episode",
  slug: "star-trek-short-treks-s01e04",
  description:
    "Harry Mudd, back to his old tricks of stealing and double-dealing, finds himself in a precarious position aboard a hostile ship - just in time to try out his latest con.",
  ownLength: 15,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-short-treks-season-1"],
  position: 4,
  publishedAt: "2019-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1575315",
      externalLink: "https://www.themoviedb.org/tv/82491/season/1/episode/4",
    },
  ],
  title: "The Escape Artist",
  episodeType: "finale",
  stillPath: "/1XHE0I7bINL9EfXvyTfd3L2FugR.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:53.775Z",
  updatedAt: "2026-10-29T15:41:53.775Z",
} as const satisfies Episode
