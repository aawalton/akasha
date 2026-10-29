import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS01e11 = {
  id: "01a18859-3c69-7642-ba54-ad80b6154042",
  type: "page-type/episode",
  slug: "torchwood-s01e11",
  description:
    "An Owen themed episode\n\nWeevils are appearing all over the streets of Cardiff, and then disappearing again - but not by alien forces. People are abducting them, and using the Weevils for their own purposes, so Owen investigates.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-1"],
  position: 11,
  publishedAt: "2006-12-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21578",
      externalLink: "https://www.themoviedb.org/tv/424/season/1/episode/11",
    },
  ],
  title: "Combat",
  episodeType: "standard",
  stillPath: "/hrGrOIURjZsylHRytlxutCrbAn9.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
