import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS03e15 = {
  id: "01a1884a-e0eb-74a3-8466-ccb612eb3bd5",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s03e15",
  description:
    "With Assistant Director Granger critiquing every move, the NCIS team must track down a chameleon-like killer who has evaded law enforcement agents, including their very own Special Agent G. Callen, across several countries.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-3"],
  position: 15,
  publishedAt: "2012-02-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557340",
      externalLink: "https://www.themoviedb.org/tv/17610/season/3/episode/15",
    },
  ],
  title: "Crimeleon",
  episodeType: "standard",
  stillPath: "/a0wb70eoqWW8bphEqePOTirbs3K.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
