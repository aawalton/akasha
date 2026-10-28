import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const deathParadeS01e01 = {
  id: "01a183da-6629-7e43-a24b-3cbc8db1935a",
  type: "page-type/episode",
  slug: "death-parade-s01e01",
  description:
    "A young couple, Takashi and Machiko, arrive in the bar Quindecim without any recollection of how they got there. The bartender tells them they cannot leave until they first finish playing a game, one in which their lives will be at stake.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/death-parade-season-1"],
  position: 1,
  publishedAt: "2015-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1037195",
      externalLink: "https://www.themoviedb.org/tv/61901/season/1/episode/1",
    },
  ],
  title: "Death Seven Darts",
  episodeType: "standard",
  stillPath: "/95nTO42WRI4jkoSsj7UEp9lZH1X.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-28T18:51:30.729Z",
  updatedAt: "2026-10-28T18:51:30.729Z",
} as const satisfies Episode
