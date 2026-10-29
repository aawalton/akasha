import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e03 = {
  id: "01a18848-c2ba-77da-b027-6bf6770183ad",
  type: "page-type/episode",
  slug: "friends-s02e03",
  description:
    "After Mr. Heckles dies and leaves all his belongings to Monica and Rachel, Chandler discovers eerie similarities between the late eccentric man and his own life. Ross and Phoebe have a dispute over the progression of evolution.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 3,
  publishedAt: "1995-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86231",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/3",
    },
  ],
  title: "The One Where Heckles Dies",
  episodeType: "standard",
  stillPath: "/qOo7AX4h1EgrBVSSEluQZzX2xH3.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
