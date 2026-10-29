import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS03e01 = {
  id: "01a18859-6798-76c5-ab29-f706f44ba0e9",
  type: "page-type/episode",
  slug: "upload-s03e01",
  description:
    "Nora and a recently downloaded Nathan race to stop Freeyond before his head explodes.",
  ownLength: 39,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-3"],
  position: 1,
  publishedAt: "2023-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4670011",
      externalLink: "https://www.themoviedb.org/tv/86248/season/3/episode/1",
    },
  ],
  title: "Ticking Clock",
  episodeType: "standard",
  stillPath: "/q7bjpTIU9kWiYF1BSYNZseUYNMQ.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
