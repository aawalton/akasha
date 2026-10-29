import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS02e01 = {
  id: "01a18884-b706-7ca8-86c3-3962b8b26c79",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s02e01",
  description:
    "Stardate: 42073.1. Troi undergoes a mysterious pregnancy when the Enterprise tries to escape from a system that has recently fallen victim to a deadly plague.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-2"],
  position: 1,
  publishedAt: "1988-11-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37086",
      externalLink: "https://www.themoviedb.org/tv/655/season/2/episode/1",
    },
  ],
  title: "The Child",
  episodeType: "standard",
  stillPath: "/uY8hu899b7Zz7ueYmiYZ8OzpNaI.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
