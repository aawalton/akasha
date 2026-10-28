import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monogatariS04e05 = {
  id: "01a183db-793c-758e-abe7-587d626d1bfc",
  type: "page-type/episode",
  slug: "monogatari-s04e05",
  description:
    "Araragi and Hanekawa visit Oikura and learn the painful story of her family's past.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/monogatari-season-4"],
  position: 5,
  publishedAt: "2015-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1112981",
      externalLink: "https://www.themoviedb.org/tv/46195/season/4/episode/5",
    },
  ],
  title: "Sodachi Lost (2)",
  episodeType: "standard",
  stillPath: "/r9WjclzkLBHgISBJ52vhNWrY6N9.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T18:52:41.143Z",
} as const satisfies Episode
