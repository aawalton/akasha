import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS05e05 = {
  id: "01a18855-9113-717c-a100-975f2f6394f6",
  type: "page-type/episode",
  slug: "stranger-things-s05e05",
  description:
    "The gang hatches an electrifying plan to reconnect Will to the hive mind. Tensions flare during a search of the Upside Down's Hawkins Lab.",
  ownLength: 69,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-season-5"],
  position: 5,
  publishedAt: "2025-12-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5607048",
      externalLink: "https://www.themoviedb.org/tv/66732/season/5/episode/5",
    },
  ],
  title: "Chapter Five: Shock Jock",
  episodeType: "standard",
  stillPath: "/A9gML0mmuyE2m3hGK0eZZA2tRPg.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
