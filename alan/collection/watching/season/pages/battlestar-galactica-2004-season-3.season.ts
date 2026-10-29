import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const battlestarGalactica2004Season3 = {
  id: "01a18843-80ec-70c8-ad60-eee134182e48",
  type: "page-type/season",
  slug: "battlestar-galactica-2004-season-3",
  description:
    "Season 3 picks up where last season's cliffhanger finale left off, the Galactica crew discovers a habitable planet, but things become even further complicated when the Cylons, led by Caprica Six and Sharon, find the planet and offer humanity a stunning proposal of peace.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/battlestar-galactica-2004"],
  position: 3,
  publishedAt: "2006-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5842",
      externalLink: "https://www.themoviedb.org/tv/1972/season/3",
    },
  ],
  title: "Battlestar Galactica (2004) Season 3",
  posterPath: "/fzM8LWSnErEidclEOjwZdiw4KQz.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:24:47.718Z",
  updatedAt: "2026-10-29T15:24:47.718Z",
} as const satisfies Season
