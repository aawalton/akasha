import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e14 = {
  id: "01a18857-c36f-7324-9ad6-06e58edda032",
  type: "page-type/episode",
  slug: "the-office-s09e14",
  description:
    "Pam’s warehouse mural is defaced. Darryl has difficulty dealing with the Jim's cleanliness habits in their apartment. Angela grudgingly allows Oscar and Kevin to attend her son’s first birthday party.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 14,
  publishedAt: "2013-01-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170326",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/14",
    },
  ],
  title: "Vandalism",
  episodeType: "standard",
  stillPath: "/zy4NJR9kqEelJ5teHPlAINBNnpE.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
