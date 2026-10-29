import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS04e10 = {
  id: "01a18884-b709-7c38-b49d-80d449be5375",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s04e10",
  description:
    "Stardate: 44356.9. Troi loses her empathic abilities when the Enterprise is caught in the gravitational pull of a black hole.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-4"],
  position: 10,
  publishedAt: "1990-12-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37114",
      externalLink: "https://www.themoviedb.org/tv/655/season/4/episode/10",
    },
  ],
  title: "The Loss",
  episodeType: "standard",
  stillPath: "/qTAsjnWjQQ8aRdn2io6FDgzh2RO.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
