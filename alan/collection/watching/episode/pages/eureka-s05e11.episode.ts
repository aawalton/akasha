import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e11 = {
  id: "01a18848-3734-723b-ae27-4e9983cfb7d8",
  type: "page-type/episode",
  slug: "eureka-s05e11",
  description:
    "Eureka is cut off from the world by a malfunctioning experiment that threatens to eradicate the town's populace.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 11,
  publishedAt: "2012-07-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335303",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/11",
    },
  ],
  title: "Mirror, Mirror",
  episodeType: "standard",
  stillPath: "/dyoWNWpCQ9ePYYtKQeqbmfT9Xnz.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
