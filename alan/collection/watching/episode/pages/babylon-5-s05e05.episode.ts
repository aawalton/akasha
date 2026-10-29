import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S05e05 = {
  id: "01a18843-5083-7ac5-9ba5-182e8cda599d",
  type: "page-type/episode",
  slug: "babylon-5-s05e05",
  description:
    "Four rangers come from Minbar with a status report to Delenn, while a Downbelow racketeer decides it's time to get rid of Zack.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-wheel-of-fire"],
  position: 5,
  publishedAt: "1998-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235903",
      externalLink: "https://www.themoviedb.org/tv/3137/season/5/episode/5",
    },
  ],
  title: "Learning Curve",
  episodeType: "standard",
  stillPath: "/sMNKAm10wFB3teX0IJ5ZvPz3SZe.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
