import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS04e03 = {
  id: "01a18881-51a2-7919-8a65-7c4eacbfbb3d",
  type: "page-type/episode",
  slug: "white-collar-s04e03",
  description: "The guys track a brilliant thief who's eluded the FBI for years.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-4"],
  position: 3,
  publishedAt: "2012-07-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596294",
      externalLink: "https://www.themoviedb.org/tv/21510/season/4/episode/3",
    },
  ],
  title: "Diminishing Returns",
  episodeType: "standard",
  stillPath: "/iw8eKvOmHC0N7nn3Lv3eKL1n08L.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
