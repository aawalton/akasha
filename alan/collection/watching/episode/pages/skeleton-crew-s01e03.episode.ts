import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS01e03 = {
  id: "01a18852-1969-7b2a-9198-4bbc22597a47",
  type: "page-type/episode",
  slug: "skeleton-crew-s01e03",
  description:
    "As Anthony faces the Carla consequences, Hunter makes a new friend at work. Eddie continues to pay for his mistakes, and Gina begins to solidify her revenge. And things between Veronica and Aaron reach a climax.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-skeleton-crew-season-1"],
  position: 3,
  publishedAt: "2015-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380448",
      externalLink: "https://www.themoviedb.org/tv/225011/season/1/episode/3",
    },
  ],
  title: "Emptying the Closet",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
