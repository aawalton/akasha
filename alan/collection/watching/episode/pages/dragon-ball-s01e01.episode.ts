import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallS01e01 = {
  id: "01a183db-f296-7672-8e70-b0bf4eb8fcf7",
  type: "page-type/episode",
  slug: "dragon-ball-s01e01",
  description:
    "Bulma's search for six more Dragon Balls leads her to a remote valley and to Son Goku, who is in possession of one of the balls. Their relationship gets off to a rocky start, but after Goku saves Bulma's life, the two join forces in search of the remaining five Dragon Balls. They had better take care, for an evil force - Pilaf - also seeks the Dragon Balls.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-season-1"],
  position: 1,
  publishedAt: "1986-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "484769",
      externalLink: "https://www.themoviedb.org/tv/12609/season/1/episode/1",
    },
  ],
  title: "The Secret of the Dragon Balls",
  episodeType: "standard",
  stillPath: "/2RSrQ82HNbBBVM3omiHObQ0EvqI.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:53:12.214Z",
  updatedAt: "2026-10-28T18:53:12.214Z",
} as const satisfies Episode
