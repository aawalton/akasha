import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS02e09 = {
  id: "01a18848-3731-7679-9783-04aebca6f158",
  type: "page-type/episode",
  slug: "eureka-s02e09",
  description:
    "An abandoned research project on invisibility returns to haunt Eureka. Carter and Zoé become tangled in a web of strange occurrences that lead to Carter’s disappearance and the possibility that he might never reappear.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-2"],
  position: 9,
  publishedAt: "2007-09-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335248",
      externalLink: "https://www.themoviedb.org/tv/4620/season/2/episode/9",
    },
  ],
  title: "Sight Unseen",
  episodeType: "standard",
  stillPath: "/ngv6u1mGLOfpDEumpHmdRLlsIKR.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
