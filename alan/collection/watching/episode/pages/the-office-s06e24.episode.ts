import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e24 = {
  id: "01a18857-c36c-7bc3-b064-5011c03500b9",
  type: "page-type/episode",
  slug: "the-office-s06e24",
  description:
    "The press finds out that Sabre’s printers catch on fire. Jo shows up to the office in hopes of finding out who the whistleblower is. Everyone suspects Andy, who adamantly denies he leaked the information.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 24,
  publishedAt: "2010-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170196",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/24",
    },
  ],
  title: "Whistleblower",
  episodeType: "finale",
  stillPath: "/ediO7Y2iJDcdmoTEFkHeS3HPTVp.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
