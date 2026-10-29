import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS16e10 = {
  id: "01a18855-c29f-7e1a-abdb-2e7b068fb542",
  type: "page-type/episode",
  slug: "studio-c-s16e10",
  description:
    "Scott Sterling plays soccer and volleyball. Gymnastics parents. Skate Park Disaster.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-16"],
  position: 10,
  publishedAt: "2022-12-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4839043",
      externalLink: "https://www.themoviedb.org/tv/68207/season/16/episode/10",
    },
  ],
  title: "Best of Sports",
  episodeType: "standard",
  stillPath: "/jkyfYLVHyYyMGodarrZaapEAUO8.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
