import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e22 = {
  id: "01a18857-c36c-7b11-bbbd-9ae6d2228cc2",
  type: "page-type/episode",
  slug: "the-office-s06e22",
  description:
    "Michael suspects Donna is cheating on him and puts P.I. Dwight Schrute on the case. Meanwhile, Andy is frustrated when no one takes his customer's complaint seriously.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 22,
  publishedAt: "2010-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170198",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/22",
    },
  ],
  title: "The Cover-Up",
  episodeType: "standard",
  stillPath: "/8RBNOu7JwQY8OBjquqnnYiVXMFk.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
