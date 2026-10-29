import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e12 = {
  id: "01a18857-c369-7e5a-9d16-835b3f468947",
  type: "page-type/episode",
  slug: "the-office-s05e12",
  description:
    "Michael and Dwight go undercover to do a bit of industrial espionage on a paper company competitor. Meanwhile, the rest of the office holds a debate to settle the question: is Hilary Swank hot?",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 12,
  publishedAt: "2009-01-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170217",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/12",
    },
  ],
  title: "Prince Family Paper",
  episodeType: "standard",
  stillPath: "/2kwJKmCJ07GIE2z2luqCI26qS1j.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
