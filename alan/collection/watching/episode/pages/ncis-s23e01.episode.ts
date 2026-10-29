import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS23e01 = {
  id: "01a1884b-ef85-737d-8bac-394641539c73",
  type: "page-type/episode",
  slug: "ncis-s23e01",
  description:
    "Reeling from his father’s murder, Parker goes to extreme lengths to hunt down the woman he holds responsible, mob boss Carla Marino, jeopardizing not only his own future but the team’s.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-23"],
  position: 1,
  publishedAt: "2025-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6382843",
      externalLink: "https://www.themoviedb.org/tv/4614/season/23/episode/1",
    },
  ],
  title: "Prodigal Son (1)",
  episodeType: "standard",
  stillPath: "/jWESpMUQFqjOjt3w136F8UOw45r.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
