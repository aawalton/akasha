import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const cardcaptorSakuraTheSealedCard = {
  id: "01a183db-3101-7b54-9599-69c692982214",
  type: "page-type/movie",
  slug: "cardcaptor-sakura-the-sealed-card",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["fandom/cardcaptor-sakura"],
  publishedAt: "2000-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "31347", externalLink: "https://www.themoviedb.org/movie/31347" },
  ],
  title: "Cardcaptor Sakura: The Sealed Card",
  createdAt: "2026-10-28T18:52:22.657Z",
  updatedAt: "2026-10-28T18:52:22.657Z",
} as const satisfies Movie
