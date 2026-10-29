import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e07 = {
  id: "01a1884b-ef7a-7d6e-b4f2-a8305254a819",
  type: "page-type/episode",
  slug: "ncis-s18e07",
  description:
    "NCIS investigates the murder of a Navy officer who was killed while driving home a recently released inmate.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 7,
  publishedAt: "2021-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2696487",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/7",
    },
  ],
  title: "The First Day",
  episodeType: "standard",
  stillPath: "/9FKJ64wMjo7alfbuwtwlAXU1zZM.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
