import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e10 = {
  id: "01a18853-f9b0-79f9-b963-f69de596ec47",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e10",
  description:
    "A pirate curses Kaz, causing him danger at every turn. Kaz is soon forced to seek Mika Grey for help, but Kaz's curse gets worse when the Guavian Death Gang appears.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 10,
  publishedAt: "2019-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1976445",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/10",
    },
  ],
  title: "Kaz's Curse",
  episodeType: "standard",
  stillPath: "/ulNEygVuPrfyfKybSYLN2IyXJsE.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
