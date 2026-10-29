import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS03e04 = {
  id: "01a18859-6798-7e88-9c5f-4b85773e7c75",
  type: "page-type/episode",
  slug: "upload-s03e04",
  description:
    "Nathan and Nora track down the doctor who invented download, while Aleesha rises higher in the Horizen hierarchy. Ingrid and back-up Nathan grow closer.",
  ownLength: 34,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-3"],
  position: 4,
  publishedAt: "2023-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4670014",
      externalLink: "https://www.themoviedb.org/tv/86248/season/3/episode/4",
    },
  ],
  title: "Download Doctor",
  episodeType: "standard",
  stillPath: "/zm6S3CHxyQOD0eZqS0Do1bhEwGt.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
