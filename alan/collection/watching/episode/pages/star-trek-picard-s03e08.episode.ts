import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS03e08 = {
  id: "01a18853-07cf-7daa-b332-a60435194abb",
  type: "page-type/episode",
  slug: "star-trek-picard-s03e08",
  description:
    "Vadic forces Picard to make an impossible choice: deliver what he can never give... or watch his crew perish. Their only salvation lies in the mind of an old friend and old foe.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-3"],
  position: 8,
  publishedAt: "2023-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4218557",
      externalLink: "https://www.themoviedb.org/tv/85949/season/3/episode/8",
    },
  ],
  title: "Surrender",
  episodeType: "standard",
  stillPath: "/fMgCEUa1H1f0VmUfVSgcRU1MpEA.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
