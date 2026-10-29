import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e45 = {
  id: "01a18855-67e7-710d-85f1-f50b55422c8b",
  type: "page-type/episode",
  slug: "steven-universe-s01e45",
  description:
    "Pearl takes Steven to a special place that belonged to Rose Quartz after Lion finds the scabbard for Rose's sword.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 45,
  publishedAt: "2015-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1044499",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/45",
    },
  ],
  title: "Rose's Scabbard",
  episodeType: "standard",
  stillPath: "/gvW3o1xcXDoOH4dYAlfbwpPglfO.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
