import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e24 = {
  id: "01a1887f-e18b-701c-a512-7cb93f10a0bb",
  type: "page-type/episode",
  slug: "star-trek-2-s03e24",
  description:
    "The Enterprise is in danger when Janice Lester, one of Kirk's former lovers, steals his body.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 24,
  publishedAt: "1969-06-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14009",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/24",
    },
  ],
  title: "Turnabout Intruder",
  episodeType: "finale",
  stillPath: "/vyLLUYYcYMXnW86zTVwmkTUe5Qv.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
