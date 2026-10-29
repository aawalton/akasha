import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS03e19 = {
  id: "01a18857-c368-733b-8284-105000006c76",
  type: "page-type/episode",
  slug: "the-office-s03e19",
  description:
    "Andy was back to work, fresh from anger management training. He insisted on being called Drew, even though Jim continued to call him Andy just to toy with him. Meanwhile, Dwight had decided to shun Andy for the next three years.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-3"],
  position: 19,
  publishedAt: "2007-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170175",
      externalLink: "https://www.themoviedb.org/tv/2316/season/3/episode/19",
    },
  ],
  title: "Safety Training",
  episodeType: "standard",
  stillPath: "/5Q2YKJFmuglZNG0NmZUXqL3mjqV.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
