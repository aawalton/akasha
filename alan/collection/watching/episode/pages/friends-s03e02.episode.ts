import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e02 = {
  id: "01a18848-c2bb-78ef-bc2c-b77337407767",
  type: "page-type/episode",
  slug: "friends-s03e02",
  description:
    "In a race against the clock, a stressed Ross tries to get the gang dressed and ready for a black-tie benefit at the museum while Joey and Chandler clash over personal belongings and personal space.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 2,
  publishedAt: "1996-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86286",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/2",
    },
  ],
  title: "The One Where No One's Ready",
  episodeType: "standard",
  stillPath: "/inYLG3aACPhQ2EN2ivpVyYU77iE.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
