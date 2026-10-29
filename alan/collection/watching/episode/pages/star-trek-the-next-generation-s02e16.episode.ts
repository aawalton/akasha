import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS02e16 = {
  id: "01a18884-b707-72cb-8258-4af429bb36ce",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s02e16",
  description:
    "Stardate: 42761.3. Q hurls the Enterprise into the Delta Quadrant and introduces the Federation to a powerful new enemy that may destroy the Alpha Quadrant: The Borg.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-2"],
  position: 16,
  publishedAt: "1989-05-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37100",
      externalLink: "https://www.themoviedb.org/tv/655/season/2/episode/16",
    },
  ],
  title: "Q Who",
  episodeType: "standard",
  stillPath: "/7mp2AGdizeDFGSmNRG1dcAcCMJg.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
