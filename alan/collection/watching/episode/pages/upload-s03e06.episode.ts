import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS03e06 = {
  id: "01a18859-6798-70fc-9d52-bda416c22a53",
  type: "page-type/episode",
  slug: "upload-s03e06",
  description:
    "Nora and Nathan find important clues to expose Freeyond, but the search poses a challenge to their relationship.",
  ownLength: 36,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-3"],
  position: 6,
  publishedAt: "2023-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4670016",
      externalLink: "https://www.themoviedb.org/tv/86248/season/3/episode/6",
    },
  ],
  title: "Memory Crackers",
  episodeType: "standard",
  stillPath: "/vC6CspD1Mfvuzdt6Df72gyOgcem.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
