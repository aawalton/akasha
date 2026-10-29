import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e21 = {
  id: "01a18848-c2bb-7375-9c06-0b033d959c2e",
  type: "page-type/episode",
  slug: "friends-s02e21",
  description:
    "Monica is broke and decides to gamble on the stock market, while Chandler and Ross run into a couple of bullies in Central Park. Rachel and Joey help Phoebe locate her father, but a vicious dog prevents Phoebe from finally meeting him.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 21,
  publishedAt: "1996-04-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86210",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/21",
    },
  ],
  title: "The One with the Bullies",
  episodeType: "standard",
  stillPath: "/36e0hB0dPMtjzMrOdqSIGhPqoPl.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
