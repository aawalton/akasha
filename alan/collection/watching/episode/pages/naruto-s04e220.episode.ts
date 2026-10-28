import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS04e220 = {
  id: "01a183d1-bb61-7869-ab8f-54432ba8bb5c",
  type: "page-type/episode",
  slug: "naruto-s04e220",
  description:
    "The exciting conclusion to Naruto. What will become of Gaara, and now that Jiraiya has returned, will Naruto finally leave Konoha to begin his training?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-4"],
  position: 220,
  publishedAt: "2007-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1161638",
      externalLink: "https://www.themoviedb.org/tv/46260/season/4/episode/220",
    },
  ],
  title: "Departure",
  episodeType: "finale",
  stillPath: "/kErbglX2IHAESEWHqEDdAmMcELU.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
