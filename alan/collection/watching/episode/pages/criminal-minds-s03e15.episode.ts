import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS03e15 = {
  id: "01a18844-d7e9-7068-9459-1d3ce0bc051f",
  type: "page-type/episode",
  slug: "criminal-minds-s03e15",
  description:
    "The BAU is called to Pittsburgh after an unusually high suicide rate appears to be the work of an Angel of Death.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-3"],
  position: 15,
  publishedAt: "2008-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283202",
      externalLink: "https://www.themoviedb.org/tv/4057/season/3/episode/15",
    },
  ],
  title: "A Higher Power",
  episodeType: "standard",
  stillPath: "/ubtwDi8eGIoPfhTOhdP9jqm07t0.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
