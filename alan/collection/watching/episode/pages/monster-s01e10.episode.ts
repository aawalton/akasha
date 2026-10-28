import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e10 = {
  id: "01a183d8-0265-775b-ace6-f6fe07cee33e",
  type: "page-type/episode",
  slug: "monster-s01e10",
  description:
    "Tenma encounters a burglar named Heckel who claims to have seen the killer. It soon results in Heckel leading Tenma to a couple of murderers.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 10,
  publishedAt: "2004-06-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749525",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/10",
    },
  ],
  title: "A Past Erased",
  episodeType: "standard",
  stillPath: "/kR95nSJmdt3BPmc4NSvrGA1m2hz.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
