import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e04 = {
  id: "01a18848-c2bd-76b3-b4c8-31a72e742529",
  type: "page-type/episode",
  slug: "friends-s04e04",
  description:
    "Joey attempts ballroom dancing in order to help Monica and Rachel keep their illegal sublet. Phoebe is attracted to one of her massage clients. And Ross tries to help Chandler quit the gym.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 4,
  publishedAt: "1997-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86388",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/4",
    },
  ],
  title: "The One with the Ballroom Dancing",
  episodeType: "standard",
  stillPath: "/khxmKmjmsQVXxJW1P8VbCdeFMoA.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
