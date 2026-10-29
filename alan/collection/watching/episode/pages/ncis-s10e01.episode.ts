import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e01 = {
  id: "01a1884b-ef6f-72f3-b7cc-e96ad1d1d8d6",
  type: "page-type/episode",
  slug: "ncis-s10e01",
  description:
    "With NCIS headquarters damaged by the bomb, Gibbs goes on the hunt for Harper Dearing to bring him down once and for all.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 1,
  publishedAt: "2012-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334671",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/1",
    },
  ],
  title: "Extreme Prejudice",
  episodeType: "standard",
  stillPath: "/uEEgjx7KjUdSxkhZaKxhRdzY4dU.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
