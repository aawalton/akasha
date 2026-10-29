import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS04e02 = {
  id: "01a18884-b709-7671-864a-032fcf4c1984",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s04e02",
  description:
    "Stardate 44012.3. Picard meets with his older brother in France, and contemplates resigning his Starfleet commission after his ordeal with the Borg. Worf's adoptive parents spend time with their son on the Enterprise, and succeed in embarrassing him in front of his crewmates.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-4"],
  position: 2,
  publishedAt: "1990-10-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37132",
      externalLink: "https://www.themoviedb.org/tv/655/season/4/episode/2",
    },
  ],
  title: "Family",
  episodeType: "standard",
  stillPath: "/pCf04LBEc7u3aSxTOnXI8yhJokV.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
