import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e09 = {
  id: "01a1884b-ef81-7a48-8714-3462ce190dba",
  type: "page-type/episode",
  slug: "ncis-s20e09",
  description:
    "NCIS investigates the death of a college student who was killed while running across the street and had connections to McGee’s wife, Delilah.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 9,
  publishedAt: "2022-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4052831",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/9",
    },
  ],
  title: "Higher Education",
  episodeType: "mid-season",
  stillPath: "/gjH15TjIDPEWqiVQFdqauZtBHG0.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
