import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS02e02 = {
  id: "01a18853-07ce-7b39-8f74-8bfcb518f0e8",
  type: "page-type/episode",
  slug: "star-trek-picard-s02e02",
  description:
    "Picard finds himself transported to an alternate timeline in the year 2400 where his longtime nemesis, Q, has orchestrated one final “trial.” Picard searches for his trusted crew as he attempts to find the cause of this dystopian future.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-2"],
  position: 2,
  publishedAt: "2022-03-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3519468",
      externalLink: "https://www.themoviedb.org/tv/85949/season/2/episode/2",
    },
  ],
  title: "Penance",
  episodeType: "standard",
  stillPath: "/57yHV15XvSjG4S4l0p8rAcUJDvf.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
