import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e21 = {
  id: "01a1884b-ef78-713a-b856-9bf003be3498",
  type: "page-type/episode",
  slug: "ncis-s16e21",
  description:
    "After entering cold case DNA into the system, Kasie solves a 30-year-old murder case, but a loophole in the legal system may set the suspect free.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 21,
  publishedAt: "2019-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1753387",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/21",
    },
  ],
  title: "Judge, Jury...",
  episodeType: "standard",
  stillPath: "/dG8wUFXSJE19JY4rUE5g79trl7b.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
