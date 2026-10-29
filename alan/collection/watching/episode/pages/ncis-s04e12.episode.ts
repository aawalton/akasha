import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e12 = {
  id: "01a1884b-ef66-7b29-8ae6-3a7c9bcf2bdb",
  type: "page-type/episode",
  slug: "ncis-s04e12",
  description:
    'When a high-level Marine intelligence officer is found murdered in a small motel room, the NCIS team must find the person who murdered her. After discovering that she was already dead for three days, and that the town authorities already "investigated" the crime, Gibbs is determined to solve the case.',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 12,
  publishedAt: "2007-01-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334482",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/12",
    },
  ],
  title: "Suspicion",
  episodeType: "standard",
  stillPath: "/lNWQRxy2gQOQjVmntdziWLQm5iV.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
