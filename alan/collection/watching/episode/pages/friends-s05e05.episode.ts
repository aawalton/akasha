import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS05e05 = {
  id: "01a18848-c2bf-79b0-aefc-ad7cbd2c60d3",
  type: "page-type/episode",
  slug: "friends-s05e05",
  description:
    "Monica and Chandler plan an Atlantic City getaway in order to have an intimate weekend away from their friends.  Meanwhile, Ross prepares himself to tell Rachel that he can't see her anymore.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-5"],
  position: 5,
  publishedAt: "1998-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86536",
      externalLink: "https://www.themoviedb.org/tv/1668/season/5/episode/5",
    },
  ],
  title: "The One with the Kips",
  episodeType: "standard",
  stillPath: "/5QOC8UgmezlCsk5vu7DGjtNG1Qd.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
