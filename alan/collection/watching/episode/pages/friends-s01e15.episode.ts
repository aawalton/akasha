import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e15 = {
  id: "01a18848-c2b9-73df-816b-408a483f5b1b",
  type: "page-type/episode",
  slug: "friends-s01e15",
  description:
    "Monica cooks a gourmet meal for a restaurateur looking for a new chef but, unfortunately, he's stoned. After working as a data processing permanent temp for five years, Chandler gets promoted. And Ross has a date with a beautiful colleague.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 15,
  publishedAt: "1995-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86068",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/15",
    },
  ],
  title: "The One with the Stoned Guy",
  episodeType: "standard",
  stillPath: "/2ShLUPe0boFwe6e9T6nQgRXRFp1.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
