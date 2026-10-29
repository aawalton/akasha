import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS10e13 = {
  id: "01a18844-d7f3-7d9d-b25b-f1d9d5ac548e",
  type: "page-type/episode",
  slug: "criminal-minds-s10e13",
  description:
    "The BAU revisits its origins when they look at one of Rossi and Gideon’s old cases to track a killer that got away.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-10"],
  position: 13,
  publishedAt: "2015-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1034015",
      externalLink: "https://www.themoviedb.org/tv/4057/season/10/episode/13",
    },
  ],
  title: "Nelson's Sparrow",
  episodeType: "standard",
  stillPath: "/4YBOSxsEUFeynrAlylN7PGaDNJx.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
