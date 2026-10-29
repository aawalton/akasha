import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e12 = {
  id: "01a18857-c36b-7748-afa9-58a58a042fcb",
  type: "page-type/episode",
  slug: "the-office-s06e12",
  description:
    "Michael gets upset when Jim promises Phyllis that she can be the office Santa, but the office Christmas party may be overshadowed by some bad news from David Wallace.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 12,
  publishedAt: "2009-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170188",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/12",
    },
  ],
  title: "Secret Santa",
  episodeType: "mid-season",
  stillPath: "/91UtqA3zap0dXyyYVQNnPiHSUfr.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
