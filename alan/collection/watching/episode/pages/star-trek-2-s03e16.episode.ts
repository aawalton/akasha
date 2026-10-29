import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e16 = {
  id: "01a1887f-e18a-7159-a229-c788e624fddf",
  type: "page-type/episode",
  slug: "star-trek-2-s03e16",
  description: "A race of overpopulated aliens abduct Captain Kirk to solve their problem.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 16,
  publishedAt: "1969-01-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14029",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/16",
    },
  ],
  title: "The Mark of Gideon",
  episodeType: "standard",
  stillPath: "/as425dOaDxcbp9Q6dkhJruNbT6I.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
