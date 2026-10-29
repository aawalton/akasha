import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS04e05 = {
  id: "01a18884-b709-7ee4-b2bf-0f5be4e8f1f1",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s04e05",
  description:
    "Stardate: 44161.2. Dr. Crusher begins to question her sanity when members of the crew start disappearing one by one, and all evidence of their existence is erased.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-4"],
  position: 5,
  publishedAt: "1990-10-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37109",
      externalLink: "https://www.themoviedb.org/tv/655/season/4/episode/5",
    },
  ],
  title: "Remember Me",
  episodeType: "standard",
  stillPath: "/5aiQoxQdzfUe5KgajxQQW1t5Szg.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
