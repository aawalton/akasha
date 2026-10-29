import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS11e02 = {
  id: "01a18844-d7f4-73f6-83cc-838f6a8890f9",
  type: "page-type/episode",
  slug: "criminal-minds-s11e02",
  description:
    "When a Los Angeles bus is attacked with sarin gas, the BAU must act quickly to find the suspect before a larger-scale incident occurs.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-11"],
  position: 2,
  publishedAt: "2015-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1106597",
      externalLink: "https://www.themoviedb.org/tv/4057/season/11/episode/2",
    },
  ],
  title: "The Witness",
  episodeType: "standard",
  stillPath: "/keKcwaX0lvVmmRSMzsKvcqYM35E.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
