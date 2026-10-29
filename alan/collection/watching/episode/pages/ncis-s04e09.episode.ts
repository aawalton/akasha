import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e09 = {
  id: "01a1884b-ef66-7d6f-a97a-a6601a59ff90",
  type: "page-type/episode",
  slug: "ncis-s04e09",
  description:
    "McGee breaks the rules, risking his NCIS job, to help his sister Sarah, who shows up disoriented and bloodied. While he works on figuring out what happened to his sister, the NCIS team are investigating a case of a Navy sailor, who is somehow connected to Sarah.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 9,
  publishedAt: "2006-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334495",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/9",
    },
  ],
  title: "Twisted Sister",
  episodeType: "standard",
  stillPath: "/mhtxDRylykVX1cEFU7jH4lWIrIF.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
