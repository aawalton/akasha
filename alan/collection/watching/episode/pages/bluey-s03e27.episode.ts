import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e27 = {
  id: "01a18843-d155-7059-bb96-113a5015a354",
  type: "page-type/episode",
  slug: "bluey-s03e27",
  description:
    "At the end of a long day, Bluey and her family are out of sync and out of sorts, so Mum gets everyone to play musical statues.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 27,
  publishedAt: "2022-06-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3781848",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/27",
    },
  ],
  title: "Musical Statues",
  episodeType: "standard",
  stillPath: "/1Foy6zf6JItA8obSw0aiz2etEit.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
