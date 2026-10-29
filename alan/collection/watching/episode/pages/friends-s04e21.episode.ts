import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e21 = {
  id: "01a18848-c2be-76b5-a987-1e1a3773703c",
  type: "page-type/episode",
  slug: "friends-s04e21",
  description:
    "As Ross and Emily send out wedding invitations, he and Rachel each look back on their relationship together while Joey and Chandler look for a purpose in life.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 21,
  publishedAt: "1998-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86426",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/21",
    },
  ],
  title: "The One with the Invitation",
  episodeType: "standard",
  stillPath: "/xOlyFkFyMhhoeHbVxgKGRneplS9.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
