import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS02e07 = {
  id: "01a18845-e1fa-7955-8ab9-dd3971e81589",
  type: "page-type/episode",
  slug: "daredevil-s02e07",
  description: "A trial close to Matt Murdock's heart grabs the city's attention.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-2"],
  position: 7,
  publishedAt: "2026-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6825663",
      externalLink: "https://www.themoviedb.org/tv/202555/season/2/episode/7",
    },
  ],
  title: "The Hateful Darkness",
  episodeType: "standard",
  stillPath: "/rmlntMleUjbXWgEk0beQla6qTDZ.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
