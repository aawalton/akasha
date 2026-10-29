import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS01e02 = {
  id: "01a18854-50a7-74ad-859e-b0a715bd94d6",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s01e02",
  description:
    "An attack by a devastating new Separatist weapon -- the powerful starship Malevolence -- leaves Jedi Master Plo Koon and his clone troopers struggling to survive until Anakin and Ahsoka can find them.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-1"],
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
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
