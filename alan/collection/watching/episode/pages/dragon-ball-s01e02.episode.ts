import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallS01e02 = {
  id: "01a183db-f296-7b8e-acec-b6bdc5a1cbc9",
  type: "page-type/episode",
  slug: "dragon-ball-s01e02",
  description:
    "Without realizing where they are, Bulma and Goku camp near Ryugadani, a foreboding land where one of the Dragon Balls lies hidden. Pilaf dispatches his henchmen to recover the ball, but they and Goku run into each other and a pack of ravenous wolves. Who will emerge the winner?",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-season-1"],
  position: 2,
  publishedAt: "1986-03-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "484770",
      externalLink: "https://www.themoviedb.org/tv/12609/season/1/episode/2",
    },
  ],
  title: "The Emperor's Quest",
  episodeType: "standard",
  stillPath: "/vS0G7ECluRUQA2nxnBvZRremBnf.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:53:12.214Z",
  updatedAt: "2026-10-28T18:53:12.214Z",
} as const satisfies Episode
