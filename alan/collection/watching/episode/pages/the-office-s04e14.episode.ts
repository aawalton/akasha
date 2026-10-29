import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS04e14 = {
  id: "01a18857-c369-70a0-a883-06f0ac77b42f",
  type: "page-type/episode",
  slug: "the-office-s04e14",
  description:
    "Toby leaves Dunder Mifflin, and Michael plans a huge goodbye party... out of joy. Angela refuses to help with it, so Michael turns to Phyllis. Dwight and Meredith harass Holly, their new HR representative.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-4"],
  position: 14,
  publishedAt: "2008-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170233",
      externalLink: "https://www.themoviedb.org/tv/2316/season/4/episode/14",
    },
  ],
  title: "Goodbye Toby",
  episodeType: "finale",
  stillPath: "/x8wJrwP3P93oB3cIXwspAxWuKnU.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
