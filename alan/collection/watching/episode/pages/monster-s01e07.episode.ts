import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e07 = {
  id: "01a183d8-0265-7b81-9d07-1ea146d39654",
  type: "page-type/episode",
  slug: "monster-s01e07",
  description:
    "Tenma and Nina return to the Fortners’ residence to find Mauler and Nina’s parents dead. Two detectives arrive to take them to the station for questioning, but certain things don't look right.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 7,
  publishedAt: "2004-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749521",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/7",
    },
  ],
  title: "House of Tragedy",
  episodeType: "standard",
  stillPath: "/iVIw85BQXHZaZVhPk4QDPTWqZxc.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
