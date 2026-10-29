import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e21 = {
  id: "01a1884b-ef82-7566-86fb-6d5ed2cae605",
  type: "page-type/episode",
  slug: "ncis-s20e21",
  description:
    "When a suspicious murder occurs in the classified section of the National Archive, NCIS must investigate a string of Russian spy encounters that may be linked to the crime.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 21,
  publishedAt: "2023-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4291830",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/21",
    },
  ],
  title: "Kompromat",
  episodeType: "standard",
  stillPath: "/aPok3giWw99UMsCl6DI5xRVBecl.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
