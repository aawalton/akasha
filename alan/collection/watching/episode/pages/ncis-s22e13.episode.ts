import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e13 = {
  id: "01a1884b-ef84-737e-b524-dda93e0e3d45",
  type: "page-type/episode",
  slug: "ncis-s22e13",
  description:
    "NCIS investigates the case of a Navy Lieutenant found dead at a blood donation bank.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 13,
  publishedAt: "2025-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5970360",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/13",
    },
  ],
  title: "Bad Blood",
  episodeType: "standard",
  stillPath: "/e0RYxmYsaTJaVwbjB6cdvinP1q2.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
