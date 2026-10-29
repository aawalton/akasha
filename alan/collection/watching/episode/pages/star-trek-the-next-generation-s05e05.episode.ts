import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS05e05 = {
  id: "01a18853-690d-76fe-b6b7-9cd8351ea3c6",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s05e05",
  description:
    "Stardate: 45156.1. A natural disaster leaves Troi in command of the Enterprise, Picard stuck in a turbo lift with three small children and Keiko O'Brien stuck in Ten-Forward giving birth with an anxious Worf.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-5"],
  position: 5,
  publishedAt: "1991-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37136",
      externalLink: "https://www.themoviedb.org/tv/655/season/5/episode/5",
    },
  ],
  title: "Disaster",
  episodeType: "standard",
  stillPath: "/tbdnfUNoOMYt7YK5cHeQSdhxuU3.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
