import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS02e03 = {
  id: "01a18852-196a-717f-8517-1d6fe41b0317",
  type: "page-type/episode",
  slug: "skeleton-crew-s02e03",
  description:
    "Veronica and Glenn struggle over their casting decisions when an unexpected guest drops by to see Glenn. Hunter and Anthony move ahead with Hunter's dream, only to have Horatio intrude. Appolina grows closer to her new friend, and Father Anglicus takes the first steps in his new life.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-2"],
  position: 3,
  publishedAt: "2016-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380460",
      externalLink: "https://www.themoviedb.org/tv/225011/season/2/episode/3",
    },
  ],
  title: "Chilled to the Bone",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
