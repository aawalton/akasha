import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS06e10 = {
  id: "01a18844-6112-7e20-8ea4-4f3e22e3506f",
  type: "page-type/episode",
  slug: "clone-wars-s06e10",
  description:
    "A Jedi mission finds a lightsaber belonging to the long-dead Master Sifo-Dyas, prompting Yoda, Obi-Wan Kenobi, and Anakin Skywalker to begin an investigation into his decade-old disappearance. This sparks Darth Sidious to order Darth Tyranus to clean up any loose ends that may lead the Jedi to discover the truth of the Sith conspiracy.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-6"],
  position: 10,
  publishedAt: "2014-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010395",
      externalLink: "https://www.themoviedb.org/tv/4194/season/6/episode/10",
    },
  ],
  title: "The Lost One",
  episodeType: "standard",
  stillPath: "/jH55XNtVgnanvWRu3ZIAKqKwtsE.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
