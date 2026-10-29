import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS03e12 = {
  id: "01a18884-b708-76ab-8bd5-dc613a877138",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s03e12",
  description:
    "Stardate: 43510.7. Dr. Crusher is abducted by a group of terrorists while delivering crucial medical supplies to a planet ravaged by civil war.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-3"],
  position: 12,
  publishedAt: "1990-01-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37221",
      externalLink: "https://www.themoviedb.org/tv/655/season/3/episode/12",
    },
  ],
  title: "The High Ground",
  episodeType: "standard",
  stillPath: "/yjWeK36ehANV2NYIcnA3sgawhun.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
