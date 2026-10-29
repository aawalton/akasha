import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e09 = {
  id: "01a18853-1b88-7940-91f1-eaa97db5ab62",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e09",
  description:
    "The crew forgo their dreams of Starfleet to return to Tars Lamora in a no-win scenario.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 9,
  publishedAt: "2022-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3448052",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/9",
    },
  ],
  title: "A Moral Star (1)",
  episodeType: "standard",
  stillPath: "/dwjJalsYHokjSurYRsLTlRPd1BC.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
