import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS01e12 = {
  id: "01a1885a-252a-7c52-8f4e-a50033db7d40",
  type: "page-type/episode",
  slug: "young-sheldon-s01e12",
  description:
    "Sheldon asks for a computer and unknowingly sparks a heated argument between Mary and George Sr. over the family’s finances.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-1"],
  position: 12,
  publishedAt: "2018-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1415338",
      externalLink: "https://www.themoviedb.org/tv/71728/season/1/episode/12",
    },
  ],
  title: "A Computer, a Plastic Pony, and a Case of Beer",
  episodeType: "standard",
  stillPath: "/8GJ6Be4XWQn58q8xFbLzzFOCO3M.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
