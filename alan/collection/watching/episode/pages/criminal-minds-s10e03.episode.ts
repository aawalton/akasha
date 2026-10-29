import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS10e03 = {
  id: "01a18844-d7f2-785b-9dbb-cdf3ab5a034f",
  type: "page-type/episode",
  slug: "criminal-minds-s10e03",
  description:
    "When a passenger jet crashes in Colorado, the BAU team is called to build a profile around the suspicious circumstances. The case hits close to home for Kate, who is reminded of a family tragedy.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-10"],
  position: 3,
  publishedAt: "2014-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1000959",
      externalLink: "https://www.themoviedb.org/tv/4057/season/10/episode/3",
    },
  ],
  title: "A Thousand Suns",
  episodeType: "standard",
  stillPath: "/xh1M7Bj4tzWSKUeSS0zG3rbxwSQ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
