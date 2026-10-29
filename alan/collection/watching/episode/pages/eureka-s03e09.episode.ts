import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e09 = {
  id: "01a18848-3732-7a94-b0a5-ec564792cd25",
  type: "page-type/episode",
  slug: "eureka-s03e09",
  description:
    "Carter interviews for a job with the Department of Homeland Security, after being terminated as the sheriff. Deputy Lupo decides to resign after discovering that a very personable robot is the new sheriff.\n\n",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 9,
  publishedAt: "2009-07-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335270",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/9",
    },
  ],
  title: "Welcome Back Carter",
  episodeType: "standard",
  stillPath: "/dWUSHJTfb3Lq4H6A334UbQgmvog.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
