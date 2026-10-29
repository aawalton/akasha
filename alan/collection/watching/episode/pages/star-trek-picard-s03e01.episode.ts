import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS03e01 = {
  id: "01a18853-07cf-7933-985c-779c499b88b9",
  type: "page-type/episode",
  slug: "star-trek-picard-s03e01",
  description:
    "After receiving a cryptic, urgent distress call from Dr. Beverly Crusher, Admiral Jean-Luc Picard enlists help from generations old and new to embark on one final adventure: a daring mission that will change Starfleet, and his old crew forever.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-3"],
  position: 1,
  publishedAt: "2023-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3942554",
      externalLink: "https://www.themoviedb.org/tv/85949/season/3/episode/1",
    },
  ],
  title: "The Next Generation",
  episodeType: "standard",
  stillPath: "/fNqxIaorxkC7gnyMqMFGMqNzMFB.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
