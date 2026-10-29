import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS01e02 = {
  id: "01a18844-610a-7d45-8565-0ad318254dfb",
  type: "page-type/episode",
  slug: "clone-wars-s01e02",
  description:
    "An attack by a devastating new Separatist weapon -- the powerful starship Malevolence -- leaves Jedi Master Plo Koon and his clone troopers struggling to survive until Anakin and Ahsoka can find them.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-clone-wars-season-1"],
  position: 2,
  publishedAt: "2008-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286570",
      externalLink: "https://www.themoviedb.org/tv/4194/season/1/episode/2",
    },
  ],
  title: "Rising Malevolence",
  episodeType: "standard",
  stillPath: "/81HOGPiAPW33ZUxyfof2AAffy0G.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
