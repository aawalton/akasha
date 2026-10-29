import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS09e15 = {
  id: "01a18848-c2c6-7ad2-a4a8-e0331e41df65",
  type: "page-type/episode",
  slug: "friends-s09e15",
  description:
    "Joey endures a draining audition at the hands of a pompous actor-director. Ross and Phoebe discover a secret link after being mugged together on the street. Chandler's advertising internship gets off to an impressive start.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-9"],
  position: 15,
  publishedAt: "2003-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87442",
      externalLink: "https://www.themoviedb.org/tv/1668/season/9/episode/15",
    },
  ],
  title: "The One with the Mugging",
  episodeType: "standard",
  stillPath: "/nBEazpZAqKuTMliM1ydfTq2QGWc.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
