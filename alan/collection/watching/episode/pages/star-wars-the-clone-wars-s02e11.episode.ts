import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS02e11 = {
  id: "01a18854-50a9-7eff-9a21-24527d29b60e",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s02e11",
  description:
    "During an assignment in the Coruscant underworld, a wily pickpocket steals Ahsoka's lightsaber. Ahsoka enlists the help of an ancient Jedi, Tera Sinube, to track down her weapon and reclaim her honor.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-2"],
  position: 11,
  publishedAt: "2010-01-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286599",
      externalLink: "https://www.themoviedb.org/tv/4194/season/2/episode/11",
    },
  ],
  title: "Lightsaber Lost",
  episodeType: "standard",
  stillPath: "/4nX6x3kuNxRLgu7wUKVJ2LdZ8Eh.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
