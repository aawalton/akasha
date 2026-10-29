import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS01e01 = {
  id: "01a18844-610a-78fe-8095-d4eefc9c83dd",
  type: "page-type/episode",
  slug: "clone-wars-s01e01",
  description:
    "Jedi Master Yoda and three clone troopers -- Jek, Thire, and Rys -- must face off against Count Dooku's dreaded assassin Ventress and her massive droid army to prove the Jedi are strong enough to protect a strategic planet and forge a treaty for the Republic.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-clone-wars-season-1"],
  position: 1,
  publishedAt: "2008-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286576",
      externalLink: "https://www.themoviedb.org/tv/4194/season/1/episode/1",
    },
  ],
  title: "Ambush",
  episodeType: "standard",
  stillPath: "/ctVCIndPwX91TtJRU88ZQY1s8Sj.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
