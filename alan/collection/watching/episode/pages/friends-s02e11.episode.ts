import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e11 = {
  id: "01a18848-c2ba-7e39-b07e-9944680a1b4a",
  type: "page-type/episode",
  slug: "friends-s02e11",
  description:
    "Monica caters the wedding of Ross's ex-wife and her lesbian lover. Phoebe is possessed by the spirit of an 82-year-old massage client who dies in the middle of a session. And Rachel's mom comes to visit and drops a bombshell.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 11,
  publishedAt: "1996-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86102",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/11",
    },
  ],
  title: "The One with the Lesbian Wedding",
  episodeType: "standard",
  stillPath: "/pvB9Hz5aaixc1HH7gvKvIwRteIU.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
