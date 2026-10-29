import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS03e01 = {
  id: "01a18855-9112-71cf-bcfe-b946039bdf51",
  type: "page-type/episode",
  slug: "stranger-things-s03e01",
  description:
    "Summer brings new jobs and budding romance. But the mood shifts when Dustin's radio picks up a Russian broadcast, and Will senses something is wrong.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-3"],
  position: 1,
  publishedAt: "2019-07-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1657328",
      externalLink: "https://www.themoviedb.org/tv/66732/season/3/episode/1",
    },
  ],
  title: "Chapter One: Suzie, Do You Copy?",
  episodeType: "standard",
  stillPath: "/97PVnrEQWEsdMnD08QDmMxLkV7h.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
