import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS04e02 = {
  id: "01a18844-d7e9-7a50-b6f0-9d5a26320c6f",
  type: "page-type/episode",
  slug: "criminal-minds-s04e02",
  description:
    "A series of murders is linked to a serial killer executed a year earlier, and the BAU team must find the link between the dead killer and the new spate of crimes.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-4"],
  position: 2,
  publishedAt: "2008-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282661",
      externalLink: "https://www.themoviedb.org/tv/4057/season/4/episode/2",
    },
  ],
  title: "The Angel Maker",
  episodeType: "standard",
  stillPath: "/nrbaZghvQG21bWA9II4hG9bbfYk.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
