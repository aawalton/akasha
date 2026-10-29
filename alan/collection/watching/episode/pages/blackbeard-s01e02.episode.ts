import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackbeardS01e02 = {
  id: "01a18843-a12b-745d-aca1-5682dc934479",
  type: "page-type/episode",
  slug: "blackbeard-s01e02",
  description:
    "An epic battle for control of the seas, for honor of Maynard's beloved Charlotte, and for possession of untold riches that lie buried in ghostly Vulture Island takes place, where Blackbeard's fate will become a symbol of an era's end in the New World.",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["season/blackbeard-season-1"],
  position: 2,
  publishedAt: "2006-06-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1434816",
      externalLink: "https://www.themoviedb.org/tv/72954/season/1/episode/2",
    },
  ],
  title: "Episode 2",
  episodeType: "finale",
  stillPath: "/empmyLrEgnqhgbJGu9DeO7mKpeV.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:24:55.979Z",
  updatedAt: "2026-10-29T15:24:55.979Z",
} as const satisfies Episode
