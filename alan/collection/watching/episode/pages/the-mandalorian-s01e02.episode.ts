import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS01e02 = {
  id: "01a18885-1cd0-73c9-8adf-779329af217b",
  type: "page-type/episode",
  slug: "the-mandalorian-s01e02",
  description: "Target in-hand, the Mandalorian must now contend with scavengers.",
  ownLength: 34,
  ownProgress: 34,
  partOfCollections: ["season/the-mandalorian-season-1"],
  position: 2,
  publishedAt: "2019-11-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1857024",
      externalLink: "https://www.themoviedb.org/tv/82856/season/1/episode/2",
    },
  ],
  title: "Chapter 2: The Child",
  episodeType: "standard",
  stillPath: "/b8y9qAq2ZdU27Ua1lJxyNQbmzQE.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:36:27.471Z",
  updatedAt: "2026-10-29T16:36:27.471Z",
} as const satisfies Episode
