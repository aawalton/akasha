import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS01e05 = {
  id: "01a18853-07cd-772f-9abe-33ee0461cb2c",
  type: "page-type/episode",
  slug: "star-trek-picard-s01e05",
  description:
    "The La Sirena crew begins an unpredictable and lively expedition on Freecloud to search for Bruce Maddox. When they learn that Maddox has found himself in a precarious situation, a familiar face offers her assistance.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-1"],
  position: 5,
  publishedAt: "2020-02-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2057380",
      externalLink: "https://www.themoviedb.org/tv/85949/season/1/episode/5",
    },
  ],
  title: "Stardust City Rag",
  episodeType: "standard",
  stillPath: "/iW6MIkGmC4TEJOOGhk2alMfP2N9.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
