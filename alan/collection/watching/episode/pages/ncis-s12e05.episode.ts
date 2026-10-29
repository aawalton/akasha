import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e05 = {
  id: "01a1884b-ef72-729d-9d24-13dca195b86a",
  type: "page-type/episode",
  slug: "ncis-s12e05",
  description:
    "During a joint Coast Guard and NCIS training exercise at sea, Gibbs and CGIS Agent Borin spot a deceased man overboard, who is discovered to be a missing crew member from a ship 60 nautical miles away.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 5,
  publishedAt: "2014-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010122",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/5",
    },
  ],
  title: "The San Dominick",
  episodeType: "standard",
  stillPath: "/zSo19k3PTe9bxL5dqkYEcn8NPuh.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
