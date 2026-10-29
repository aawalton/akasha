import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e24 = {
  id: "01a1884b-ef6d-77d6-a27e-9e9bf2e9778a",
  type: "page-type/episode",
  slug: "ncis-s08e24",
  description:
    "The lives of NCIS members are in jeopardy when they come face-to-face with the infamous Port-to-Port Killer.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 24,
  publishedAt: "2011-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334590",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/24",
    },
  ],
  title: "Pyramid",
  episodeType: "finale",
  stillPath: "/8EGX70teSilnBWcbHEVh3oM2TCk.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
