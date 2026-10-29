import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e16 = {
  id: "01a1884b-ef82-71f3-881c-23b773fad711",
  type: "page-type/episode",
  slug: "ncis-s20e16",
  description:
    "The NCIS team jumps into motion to investigate who is responsible for a potential bioterror attack at a strip mall parking garage.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 16,
  publishedAt: "2023-03-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4261631",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/16",
    },
  ],
  title: "Butterfly Effect",
  episodeType: "standard",
  stillPath: "/2iEAz5JvCxOstyv4BdyQWiXNdLd.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
