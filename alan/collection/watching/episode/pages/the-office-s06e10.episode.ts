import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e10 = {
  id: "01a18857-c36b-7053-a711-6f8bc06101d5",
  type: "page-type/episode",
  slug: "the-office-s06e10",
  description:
    'Michael speaks out of line at the Dunder Mifflin shareholders meeting and creates a big problem for management, while Jim discovers that nobody in the office thinks he\'s the "real" boss.',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 10,
  publishedAt: "2009-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170184",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/10",
    },
  ],
  title: "Shareholder Meeting",
  episodeType: "standard",
  stillPath: "/3MDPYQJtNYOhwrU4gf8eRwpUrka.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
