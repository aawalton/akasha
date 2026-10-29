import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS01e05 = {
  id: "01a18859-6797-79d6-aa8d-12cf8373890e",
  type: "page-type/episode",
  slug: "upload-s01e05",
  description:
    "Nora’s Dad’s vape lung worsens while Nathan, his friend Luke, and Dylan, an uploaded teen whose body is not keeping up with his age, visit a hacker’s market in cyberspace.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-1"],
  position: 5,
  publishedAt: "2020-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2249646",
      externalLink: "https://www.themoviedb.org/tv/86248/season/1/episode/5",
    },
  ],
  title: "The Grey Market",
  episodeType: "standard",
  stillPath: "/t4xFy3v3HtlPvdEwOArw3JmKONB.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
