import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e08 = {
  id: "01a18857-c36f-7802-812f-e0c9c90cf9f1",
  type: "page-type/episode",
  slug: "the-office-s09e08",
  description:
    "Angela goes to Dwight for help when she learns that her husband is having an affair. Stanley and Phyllis take advantage of Jim when he needs a favor, and Pete distracts Pam as she begins painting her mural.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 8,
  publishedAt: "2012-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170321",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/8",
    },
  ],
  title: "The Target",
  episodeType: "standard",
  stillPath: "/cjqRFwr2v91gq8qzfefil8egCPt.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
