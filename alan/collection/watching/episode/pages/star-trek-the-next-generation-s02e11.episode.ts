import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS02e11 = {
  id: "01a18884-b707-729a-9364-f951a8e2d673",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s02e11",
  description:
    "Stardate: 42609.1. A strange power source disables the Enterprise's computer systems, damages Data's programming and leaves the ship and crew vulnerable to a Romulan attack.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-2"],
  position: 11,
  publishedAt: "1989-03-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37095",
      externalLink: "https://www.themoviedb.org/tv/655/season/2/episode/11",
    },
  ],
  title: "Contagion",
  episodeType: "standard",
  stillPath: "/7ZpxyjlZfgviLx5Ajc1QdHP75WA.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
