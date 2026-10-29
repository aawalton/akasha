import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS02e13 = {
  id: "01a18884-b707-74fa-9090-63f78abce183",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s02e13",
  description:
    "Stardate: 42679.2. Picard encounters his double from six hours in the future, whose Enterprise had been destroyed.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-2"],
  position: 13,
  publishedAt: "1989-04-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37097",
      externalLink: "https://www.themoviedb.org/tv/655/season/2/episode/13",
    },
  ],
  title: "Time Squared",
  episodeType: "standard",
  stillPath: "/kqF81z2mMzDIkeLpHQa94rNpkZb.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
