import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e07 = {
  id: "01a18848-3734-7b5f-92fa-3418884f8a03",
  type: "page-type/episode",
  slug: "eureka-s05e07",
  description:
    "Fargo is convinced that Holly is still inside of the Matrix computer, but the DOD is determined to wipe its hard drive clean -- losing Dr. Marten forever.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 7,
  publishedAt: "2012-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335300",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/7",
    },
  ],
  title: "Ex Machina",
  episodeType: "standard",
  stillPath: "/97gLindNN2mku4cbBY71B8WFbrH.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
