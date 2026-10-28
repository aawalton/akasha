import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e01 = {
  id: "01a183d2-3bd3-701f-b3de-a99d0095245e",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e01",
  description:
    "A figure passes through the gates. It's an older Naruto, who has returned from a long training journey with Jiraiya. Naruto Uzumaki is back!",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 1,
  publishedAt: "2007-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761472",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/1",
    },
  ],
  title: "Homecoming",
  episodeType: "standard",
  stillPath: "/lFg0YnHI7sJkPSv38a8ctE96sqr.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
