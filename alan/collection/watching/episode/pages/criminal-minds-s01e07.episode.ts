import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e07 = {
  id: "01a18883-a8ae-789f-baf5-c4abd1ce4031",
  type: "page-type/episode",
  slug: "criminal-minds-s01e07",
  description:
    "The BAU profiles a serial killer who takes families hostage and lives with them as a father figure during what is supposed to be their family vacations.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 7,
  publishedAt: "2005-11-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282882",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/7",
    },
  ],
  title: "The Fox",
  episodeType: "standard",
  stillPath: "/p1mHOIXrNrzSCpNcCtU6nNaMHlN.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
