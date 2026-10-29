import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS01e04 = {
  id: "01a18855-9112-782c-9904-d51f2b622a0e",
  type: "page-type/episode",
  slug: "stranger-things-s01e04",
  description:
    "Refusing to believe Will is dead, Joyce tries to connect with her son. The boys give Eleven a makeover. Nancy and Jonathan form an unlikely alliance.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-season-1"],
  position: 4,
  publishedAt: "2016-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1203680",
      externalLink: "https://www.themoviedb.org/tv/66732/season/1/episode/4",
    },
  ],
  title: "Chapter Four: The Body",
  episodeType: "standard",
  stillPath: "/60wmC1e20HV8gu688GAhsWxqxPx.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
