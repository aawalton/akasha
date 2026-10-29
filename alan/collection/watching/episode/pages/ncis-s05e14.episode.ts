import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e14 = {
  id: "01a1884b-ef68-7170-9aac-9027a0477873",
  type: "page-type/episode",
  slug: "ncis-s05e14",
  description:
    "The dead body of La Grenouille surfaces and the entire NCIS is put under investigation by the FBI, with Jenny as the prime suspect for his murder.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 14,
  publishedAt: "2008-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334466",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/14",
    },
  ],
  title: "Internal Affairs",
  episodeType: "standard",
  stillPath: "/9qT8OYQO7DiYGeA9D7snloYJ3ek.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
