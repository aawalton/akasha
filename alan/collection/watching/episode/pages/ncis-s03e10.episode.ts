import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e10 = {
  id: "01a1884b-ef65-78cf-a2ca-d306a4ce76ed",
  type: "page-type/episode",
  slug: "ncis-s03e10",
  description:
    "While on duty, McGee kills a man who is later discovered to be an undercover police officer. When Jen decides to approve the investigation on McGee, the NCIS team are forced to prove that McGee is not guilty, pushing Gibbs' relationship with Jen to the limit.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 10,
  publishedAt: "2005-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334526",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/10",
    },
  ],
  title: "Probie",
  episodeType: "standard",
  stillPath: "/sA98ImwEsAkjCHJWjyGVhWajDfJ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
