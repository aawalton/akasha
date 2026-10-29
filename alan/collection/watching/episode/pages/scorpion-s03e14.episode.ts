import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS03e14 = {
  id: "01a1887f-56d6-7c3e-ae0e-79296990486d",
  type: "page-type/episode",
  slug: "scorpion-s03e14",
  description:
    "Team Scorpion must save a man teetering on the edge of a massive sink hole that threatens to destroy the Los Angeles water supply forever.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-3"],
  position: 14,
  publishedAt: "2017-01-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1257963",
      externalLink: "https://www.themoviedb.org/tv/60797/season/3/episode/14",
    },
  ],
  title: "The Hole Truth",
  episodeType: "standard",
  stillPath: "/iSECaLISf0NaXCmgnrGVmKL1WHX.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
