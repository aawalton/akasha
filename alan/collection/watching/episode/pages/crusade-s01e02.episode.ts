import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const crusadeS01e02 = {
  id: "01a18845-c75d-7053-b6f9-6a348290b047",
  type: "page-type/episode",
  slug: "crusade-s01e02",
  description:
    "Gideon mediates between Earth miners and the residents of a planet containing a virus-fighting mineral--and a fire-breathing dragon.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/crusade-season-1"],
  position: 2,
  publishedAt: "1999-06-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "147531",
      externalLink: "https://www.themoviedb.org/tv/2120/season/1/episode/2",
    },
  ],
  title: "The Long Road",
  episodeType: "standard",
  stillPath: "/yvTZOft9OwzRiV93kNVrQOGCUTR.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:27:16.829Z",
  updatedAt: "2026-10-29T15:27:16.829Z",
} as const satisfies Episode
