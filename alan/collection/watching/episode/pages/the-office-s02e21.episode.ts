import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS02e21 = {
  id: "01a18857-c367-7c8b-8e48-8bcaf7d4efb7",
  type: "page-type/episode",
  slug: "the-office-s02e21",
  description:
    "When Michael takes over conflict resolution duties from HR, chaos ensues at Dunder Mifflin.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-2"],
  position: 21,
  publishedAt: "2006-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170144",
      externalLink: "https://www.themoviedb.org/tv/2316/season/2/episode/21",
    },
  ],
  title: "Conflict Resolution",
  episodeType: "standard",
  stillPath: "/cKknrzfvCktHLbQVOSPVJgXWDZ7.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
