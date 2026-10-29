import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS01e10 = {
  id: "01a18859-3c69-72a5-a386-0c3cf1dd1f7e",
  type: "page-type/episode",
  slug: "torchwood-s01e10",
  description:
    "Three passengers from 1953 arrive in modern day Cardiff, when their plane flies through the Rift. With no means of travelling back, each person must adapt to their new life, starting personal relationships with the separate members of Torchwood.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-1"],
  position: 10,
  publishedAt: "2006-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21577",
      externalLink: "https://www.themoviedb.org/tv/424/season/1/episode/10",
    },
  ],
  title: "Out of Time",
  episodeType: "standard",
  stillPath: "/nTDaVKe78btsdzLomZePGcFTIrl.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
