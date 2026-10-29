import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLegendOfKorraS02e09 = {
  id: "01a18857-4fe4-7e1e-99dd-d7329147ace0",
  type: "page-type/episode",
  slug: "the-legend-of-korra-s02e09",
  description: "Korra seeks Tenzin's help to enter the Spirit World for the first time.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/book-two-spirits"],
  position: 9,
  publishedAt: "2013-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779577",
      externalLink: "https://www.themoviedb.org/tv/33880/season/2/episode/9",
    },
  ],
  title: "The Guide",
  episodeType: "standard",
  stillPath: "/uuObaC9UP3EWtiyUw4H37q9ynLN.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:25.891Z",
  updatedAt: "2026-10-29T15:46:25.891Z",
} as const satisfies Episode
