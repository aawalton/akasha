import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e19 = {
  id: "01a18848-3734-7631-910e-7eefce666879",
  type: "page-type/episode",
  slug: "eureka-s04e19",
  description:
    "When an explosion in the Astraeus lab accidentally sends Andy to Titan the team must devise a plan to save him before it's too late! Eureka",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 19,
  publishedAt: "2011-09-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335289",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/19",
    },
  ],
  title: "One Small Step...",
  episodeType: "standard",
  stillPath: "/JUuTxl8osZeEwExoD3zIKcGuyt.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
