import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e13 = {
  id: "01a18857-c36e-74ea-905f-339939034a39",
  type: "page-type/episode",
  slug: "the-office-s08e13",
  description:
    "Jim returns from jury duty, only to have to deal with Dwight's pesky questions about the details of the case. Elsewhere, Angela and her senator beau welcome their baby.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 13,
  publishedAt: "2012-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170299",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/13",
    },
  ],
  title: "Jury Duty",
  episodeType: "standard",
  stillPath: "/pO4AvKEd0jSDnoY3LUaGpMU75Ze.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
