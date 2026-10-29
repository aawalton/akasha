import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS01e09 = {
  id: "01a18859-6797-789c-b42b-41e911714345",
  type: "page-type/episode",
  slug: "upload-s01e09",
  description:
    "The Uploads are looking forward to the improvements in the new Lakeview Operating System. Nathan and Nora stay up late to recover Nathan’s missing memories.",
  ownLength: 34,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-1"],
  position: 9,
  publishedAt: "2020-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2249650",
      externalLink: "https://www.themoviedb.org/tv/86248/season/1/episode/9",
    },
  ],
  title: "Update Eve",
  episodeType: "standard",
  stillPath: "/m9hBznl3CzlAYoymVY9hIBNkePD.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
