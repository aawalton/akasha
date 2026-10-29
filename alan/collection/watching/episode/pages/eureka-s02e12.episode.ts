import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS02e12 = {
  id: "01a18848-3731-7e7b-aeac-b137a50bdd2b",
  type: "page-type/episode",
  slug: "eureka-s02e12",
  description:
    "Beverly Barlow returns to town just as a parasitic bacterium threatens to destroy Eureka, by turning everything to gold and then into rust --- people included.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-2"],
  position: 12,
  publishedAt: "2007-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335251",
      externalLink: "https://www.themoviedb.org/tv/4620/season/2/episode/12",
    },
  ],
  title: "All That Glitters",
  episodeType: "standard",
  stillPath: "/6HqMFf6oy8nOLDvAnHSOFFouR07.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
