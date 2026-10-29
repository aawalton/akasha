import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e18 = {
  id: "01a18853-1b8a-7da3-8d70-483c03ac6405",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e18",
  description:
    "Admiral Janeway devises a clever plan to liberate her crew from Asencia's prison, where they're trapped with an angry captive from the Loom.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 18,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230752",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/18",
    },
  ],
  title: "Touch of Grey",
  episodeType: "standard",
  stillPath: "/uTrzj20wfdbQdjuexVBvKONeUXD.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
