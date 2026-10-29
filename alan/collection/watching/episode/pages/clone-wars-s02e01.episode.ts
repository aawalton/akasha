import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS02e01 = {
  id: "01a18844-610c-7e6d-beaf-aed2d3ba3867",
  type: "page-type/episode",
  slug: "clone-wars-s02e01",
  description:
    "Cad Bane has been hired by Darth Sidious to steal a Jedi holocron. The holocrons -- data storage systems that can only be opened through the Force -- are protected within a vault inside the Jedi Temple. Recruiting a changeling posing as a Jedi in his plot, Bane infiltrates the building's security systems and leads Anakin, Obi-Wan and Ahsoka on a chase.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-clone-wars-season-2"],
  position: 1,
  publishedAt: "2009-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286589",
      externalLink: "https://www.themoviedb.org/tv/4194/season/2/episode/1",
    },
  ],
  title: "Holocron Heist",
  episodeType: "standard",
  stillPath: "/5LtQU2LilowgxnF6VH2ISxmzsKx.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
