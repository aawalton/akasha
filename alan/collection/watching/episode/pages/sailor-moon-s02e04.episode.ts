import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS02e04 = {
  id: "01a183d8-4892-7ede-92fc-4d1b929b9b12",
  type: "page-type/episode",
  slug: "sailor-moon-s02e04",
  description:
    "Usagi visits the new Virtual Reality Theatre with Mamoru unaware that it is the next target for Ali and En's energy harvesting operations.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-2"],
  position: 4,
  publishedAt: "1993-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992346",
      externalLink: "https://www.themoviedb.org/tv/3570/season/2/episode/4",
    },
  ],
  title: "VR Madness",
  episodeType: "standard",
  stillPath: "/upWMmqGOcNnW8agl4M9Ty0omBzp.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
