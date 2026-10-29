import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS01e05 = {
  id: "01a18855-9112-7e48-84d4-5c03c46f3695",
  type: "page-type/episode",
  slug: "stranger-things-s01e05",
  description:
    "Hopper breaks into the lab while Nancy and Jonathan confront the force that took Will. The boys ask Mr. Clarke how to travel to another dimension.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-season-1"],
  position: 5,
  publishedAt: "2016-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1205904",
      externalLink: "https://www.themoviedb.org/tv/66732/season/1/episode/5",
    },
  ],
  title: "Chapter Five: The Flea and the Acrobat",
  episodeType: "standard",
  stillPath: "/exT4NW9EdXG1qLZHKJnRpq3gh1H.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
