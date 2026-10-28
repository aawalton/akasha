import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whisperOfTheHeart = {
  id: "01a183da-7923-76ba-ae0f-b5b45a25c79f",
  type: "page-type/movie",
  slug: "whisper-of-the-heart",
  ownLength: 111,
  ownProgress: 0,
  partOfCollections: ["fandom/whisper-of-the-heart"],
  publishedAt: "1995-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "37797", externalLink: "https://www.themoviedb.org/movie/37797" },
  ],
  title: "Whisper of the Heart",
  createdAt: "2026-10-28T18:51:35.586Z",
  updatedAt: "2026-10-28T18:51:35.586Z",
} as const satisfies Movie
