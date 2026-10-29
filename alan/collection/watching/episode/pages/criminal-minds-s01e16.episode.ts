import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e16 = {
  id: "01a18883-a8af-75ba-91d8-72cd1bfc2de2",
  type: "page-type/episode",
  slug: "criminal-minds-s01e16",
  description:
    "The BAU team believes a dangerous cult may be responsible for the mass murders of five college students in an empty house.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 16,
  publishedAt: "2006-03-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282914",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/16",
    },
  ],
  title: "The Tribe",
  episodeType: "standard",
  stillPath: "/58TdNsMkdc4d3odgYSsk6OvFeKm.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
