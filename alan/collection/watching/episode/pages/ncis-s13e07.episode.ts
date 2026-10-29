import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e07 = {
  id: "01a1884b-ef73-7a71-8d7d-e6a5b12fb956",
  type: "page-type/episode",
  slug: "ncis-s13e07",
  description:
    "The NCIS murder case of a retired Navy Lieutenant Commander forces Ducky to reveal his participation in a secret society that solves cold cases.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 7,
  publishedAt: "2015-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1134387",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/7",
    },
  ],
  title: "16 Years",
  episodeType: "standard",
  stillPath: "/qMdfbVejEiosmVwin9KcboBF4Ha.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
