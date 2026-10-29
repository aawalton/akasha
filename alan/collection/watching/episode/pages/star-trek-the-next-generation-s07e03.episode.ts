import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS07e03 = {
  id: "01a18853-6910-7dcd-b121-66aeb782d715",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s07e03",
  description:
    "Stardate: 47215.5. Geordi defies direct orders from Captain Picard in an attempt to rescue his mother who had recently been reported as missing.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-7"],
  position: 3,
  publishedAt: "1993-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37186",
      externalLink: "https://www.themoviedb.org/tv/655/season/7/episode/3",
    },
  ],
  title: "Interface",
  episodeType: "standard",
  stillPath: "/6oUu3B0Qf9ZY3P2az5BoVZXEad1.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
