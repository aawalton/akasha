import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS04e07 = {
  id: "01a18852-196b-7f98-a4e8-c2bc30773451",
  type: "page-type/episode",
  slug: "skeleton-crew-s04e07",
  description: "What is The Huxley Proxy? Step inside, if you dare.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-4"],
  position: 7,
  publishedAt: "2019-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380511",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4/episode/7",
    },
  ],
  title: "The Huxley Proxy, Part 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
