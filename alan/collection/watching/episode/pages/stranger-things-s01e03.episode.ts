import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS01e03 = {
  id: "01a18855-9112-7f93-8732-5171d267b852",
  type: "page-type/episode",
  slug: "stranger-things-s01e03",
  description:
    "An increasingly concerned Nancy looks for Barb and finds out what Jonathan's been up to. Joyce is convinced Will is trying to talk to her.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-season-1"],
  position: 3,
  publishedAt: "2016-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1203679",
      externalLink: "https://www.themoviedb.org/tv/66732/season/1/episode/3",
    },
  ],
  title: "Chapter Three: Holly, Jolly",
  episodeType: "standard",
  stillPath: "/5snULpWQWp7aqFto7UbRcEkEyyS.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
