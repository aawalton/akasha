import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS05e02 = {
  id: "01a18844-d7eb-734f-916f-804aa87c21c4",
  type: "page-type/episode",
  slug: "criminal-minds-s05e02",
  description:
    "The BAU must determine what caused a disturbed man to murder several people at a pharmacy before he harms anyone else.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-5"],
  position: 2,
  publishedAt: "2009-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283224",
      externalLink: "https://www.themoviedb.org/tv/4057/season/5/episode/2",
    },
  ],
  title: "Haunted",
  episodeType: "standard",
  stillPath: "/t2XbEuauEWGmvef3FacS2Rdsaq9.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
