import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS02e11 = {
  id: "01a18844-610c-7d74-a97a-3d062cbc5e78",
  type: "page-type/episode",
  slug: "clone-wars-s02e11",
  description:
    "During an assignment in the Coruscant underworld, a wily pickpocket steals Ahsoka's lightsaber. Ahsoka enlists the help of an ancient Jedi, Tera Sinube, to track down her weapon and reclaim her honor.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-clone-wars-season-2"],
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
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
