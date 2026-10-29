import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e13 = {
  id: "01a1884b-ef7d-7b26-a663-d986c389ab9c",
  type: "page-type/episode",
  slug: "ncis-s19e13",
  description:
    "While investigating the death of an intruder at Quantico, Jimmy and Kasie are exposed to a deadly biotoxin. The NCIS team calls on Dr. Carol Wilson for help as they race to find the antidote.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 13,
  publishedAt: "2022-02-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248857",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/13",
    },
  ],
  title: "The Helpers",
  episodeType: "standard",
  stillPath: "/kyPRHhGtUDj0cGSqZacbfeKB8Qm.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
