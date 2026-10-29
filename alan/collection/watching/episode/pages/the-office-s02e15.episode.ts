import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS02e15 = {
  id: "01a18857-c366-7a4c-a799-24c024230e0e",
  type: "page-type/episode",
  slug: "the-office-s02e15",
  description:
    'Jan holds a "Women in the Workplace" seminar at Dunder-Mifflin for the paper company\'s female employees. Michael, feeling more than a bit left out, decides to have his own "seminar" when he takes the male workers down to the warehouse.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-2"],
  position: 15,
  publishedAt: "2006-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170145",
      externalLink: "https://www.themoviedb.org/tv/2316/season/2/episode/15",
    },
  ],
  title: "Boys and Girls",
  episodeType: "standard",
  stillPath: "/xfZptE9tlSKlry0G49zg86AwKaw.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
