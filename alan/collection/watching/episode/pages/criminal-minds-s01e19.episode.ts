import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e19 = {
  id: "01a18883-a8af-731a-8ff7-8f6360ea829f",
  type: "page-type/episode",
  slug: "criminal-minds-s01e19",
  description:
    "The BAU team travels to Mexico to aid in the capture of a serial killer who is targeting elderly women.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 19,
  publishedAt: "2006-04-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282917",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/19",
    },
  ],
  title: "Machismo",
  episodeType: "standard",
  stillPath: "/h1Ifji80euTDmQX1Rgho6AoUuLS.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
