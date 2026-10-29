import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e07 = {
  id: "01a1884b-ef7d-7d4d-b664-c100ce7b4819",
  type: "page-type/episode",
  slug: "ncis-s19e07",
  description:
    "NCIS investigates the death of a man on a cruise ship whose body is discovered in the ship's sauna by none other than McGee's mother-in-law, Judy.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 7,
  publishedAt: "2021-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248851",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/7",
    },
  ],
  title: "Docked",
  episodeType: "standard",
  stillPath: "/odILTsF052wJgdmRqOh8FOMwcj6.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
