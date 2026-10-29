import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS02e09 = {
  id: "01a18853-07cf-711b-89d4-7f309460e961",
  type: "page-type/episode",
  slug: "star-trek-picard-s02e09",
  description:
    "Picard and his crew fight for their lives as they come under attack from a new incarnation of an old enemy. But to survive, Picard must first face the ghosts of his past. Seven and Raffi have a final showdown with Jurati.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-2"],
  position: 9,
  publishedAt: "2022-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3651754",
      externalLink: "https://www.themoviedb.org/tv/85949/season/2/episode/9",
    },
  ],
  title: "Hide and Seek",
  episodeType: "standard",
  stillPath: "/bPlCGYO9qBkEEKilUodbXw4ehOu.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
