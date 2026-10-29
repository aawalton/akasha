import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS02e07 = {
  id: "01a18855-67e7-7663-8f5f-55b5a43e4af0",
  type: "page-type/episode",
  slug: "steven-universe-s02e07",
  description:
    "When Jamie the mailman falls in love with Garnet, Steven and Connie must help turn him down gently.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-2"],
  position: 7,
  publishedAt: "2015-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1050026",
      externalLink: "https://www.themoviedb.org/tv/61175/season/2/episode/7",
    },
  ],
  title: "Love Letters",
  episodeType: "standard",
  stillPath: "/wfPU91GAyfWdQPW5pVw07tp40uy.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
