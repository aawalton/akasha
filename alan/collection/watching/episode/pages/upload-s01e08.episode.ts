import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS01e08 = {
  id: "01a18859-6797-7b6f-89d3-1a41e052134f",
  type: "page-type/episode",
  slug: "upload-s01e08",
  description:
    "After a surprising revelation, Nathan shops for a new digital after-life. Nora travels to LA to help Ingrid stop him from leaving Lakeview.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-1"],
  position: 8,
  publishedAt: "2020-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2249649",
      externalLink: "https://www.themoviedb.org/tv/86248/season/1/episode/8",
    },
  ],
  title: "Shopping Other Digital After-Lives",
  episodeType: "standard",
  stillPath: "/b66B98DMzSPr9pzM2JW8Wneh4PK.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
