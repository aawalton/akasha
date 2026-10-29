import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS06e06 = {
  id: "01a18881-51a3-7c92-8566-a046f8ff0075",
  type: "page-type/episode",
  slug: "white-collar-s06e06",
  description:
    "In order to help Neal carry out a risky heist, Peter must involve himself in a dangerous con.",
  ownLength: 47,
  ownProgress: 47,
  partOfCollections: ["season/white-collar-season-6"],
  position: 6,
  publishedAt: "2014-12-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1016924",
      externalLink: "https://www.themoviedb.org/tv/21510/season/6/episode/6",
    },
  ],
  title: "Au Revoir",
  episodeType: "finale",
  stillPath: "/ajrLJ3erWKIU1wdmPMpEof7GX38.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
