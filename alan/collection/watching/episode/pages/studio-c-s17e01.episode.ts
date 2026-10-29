import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS17e01 = {
  id: "01a18855-c29f-7fd2-9ec2-8d730552ba2f",
  type: "page-type/episode",
  slug: "studio-c-s17e01",
  description:
    "Kiri, Carl, and Aleta join the cast! Trainees get robbed, morph malfunctions & an angry assistant.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-17"],
  position: 1,
  publishedAt: "2023-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4839045",
      externalLink: "https://www.themoviedb.org/tv/68207/season/17/episode/1",
    },
  ],
  title: "A Defective Detective",
  episodeType: "standard",
  stillPath: "/7okIR43OYciCEK1GtJjhnFw2CGh.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
