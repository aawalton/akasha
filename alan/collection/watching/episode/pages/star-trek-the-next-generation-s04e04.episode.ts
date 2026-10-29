import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS04e04 = {
  id: "01a18884-b709-738b-adf3-044a2a3f0565",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s04e04",
  description:
    "Stardate: 44143.7. A custody battle between Picard and a child's adoptive father arises when a boy showing evidence of abuse is discovered.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-4"],
  position: 4,
  publishedAt: "1990-10-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37108",
      externalLink: "https://www.themoviedb.org/tv/655/season/4/episode/4",
    },
  ],
  title: "Suddenly Human",
  episodeType: "standard",
  stillPath: "/q4kKdRD6s9byDr3KcBaug78mXyY.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
