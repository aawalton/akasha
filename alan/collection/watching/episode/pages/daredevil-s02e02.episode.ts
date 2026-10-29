import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS02e02 = {
  id: "01a18845-e1fa-71a5-9794-9f35cd1e207c",
  type: "page-type/episode",
  slug: "daredevil-s02e02",
  description: "Fisk tries a new tactic to lure Daredevil out of hiding.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-2"],
  position: 2,
  publishedAt: "2026-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6825658",
      externalLink: "https://www.themoviedb.org/tv/202555/season/2/episode/2",
    },
  ],
  title: "Shoot the Moon",
  episodeType: "standard",
  stillPath: "/kbpZdUUA54SKeuJDXMLZJWr5qtF.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
