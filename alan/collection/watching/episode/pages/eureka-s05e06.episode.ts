import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e06 = {
  id: "01a18848-3734-70a2-a46b-d01a63accfbb",
  type: "page-type/episode",
  slug: "eureka-s05e06",
  description:
    "Henry conducts a preparedness drill that winds up a disaster and Fargo faces a hard reality.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 6,
  publishedAt: "2012-05-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335295",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/6",
    },
  ],
  title: "Worst Case Scenario",
  episodeType: "standard",
  stillPath: "/9pF9NdQxEpY1OBfgZB9ca6sA7ak.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
