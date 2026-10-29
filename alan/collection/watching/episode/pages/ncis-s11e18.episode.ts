import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e18 = {
  id: "01a1884b-ef71-71b1-9653-73cadc336c00",
  type: "page-type/episode",
  slug: "ncis-s11e18",
  description:
    "When a former NCIS agent's body washes ashore in New Orleans, Gibbs reunites with NCIS Special Agent Dwayne Cassius Pride to determine if the murder was politically motivated or related to a well-known case.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 18,
  publishedAt: "2014-03-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "973283",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/18",
    },
  ],
  title: "Crescent City (1)",
  episodeType: "standard",
  stillPath: "/tR8ICZIblwclrvhcVhIgWj0pHHF.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
