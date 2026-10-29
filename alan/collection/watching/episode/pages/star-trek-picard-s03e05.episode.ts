import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS03e05 = {
  id: "01a18853-07cf-75da-9611-146b8ffcb793",
  type: "page-type/episode",
  slug: "star-trek-picard-s03e05",
  description:
    "Caught by Starfleet and facing court martial, paranoia grows as Picard struggles to uncover whether a prodigal crewman from his past has returned as an ally – or an enemy hellbent on destroying them all.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-3"],
  position: 5,
  publishedAt: "2023-03-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4218554",
      externalLink: "https://www.themoviedb.org/tv/85949/season/3/episode/5",
    },
  ],
  title: "Imposters",
  episodeType: "standard",
  stillPath: "/3xEOIVFQIuo93Wd71xvDf5CiLDv.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
