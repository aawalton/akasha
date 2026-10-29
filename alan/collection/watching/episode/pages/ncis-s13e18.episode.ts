import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e18 = {
  id: "01a1884b-ef74-7ac5-bef8-13fd83d48c36",
  type: "page-type/episode",
  slug: "ncis-s13e18",
  description:
    "The NCIS team re-examines an ambush on a group of Special Ops snipers in Iraq after an American couple is attacked in the same area six months later.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 18,
  publishedAt: "2016-03-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1175896",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/18",
    },
  ],
  title: "Scope",
  episodeType: "standard",
  stillPath: "/vVAJzB87Jul5YZcyq1qeDV7viYI.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
