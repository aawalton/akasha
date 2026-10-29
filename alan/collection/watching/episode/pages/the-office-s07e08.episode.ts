import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e08 = {
  id: "01a18857-c36c-77ca-b668-4ba229509142",
  type: "page-type/episode",
  slug: "the-office-s07e08",
  description:
    "An ostracized Michael does all he can to sabotage Gabe's party while Angela requests sex from Dwight.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 8,
  publishedAt: "2010-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170273",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/8",
    },
  ],
  title: "Viewing Party",
  episodeType: "standard",
  stillPath: "/q1SVOVyAXrK6rpWlsWvKnk6Dloc.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
