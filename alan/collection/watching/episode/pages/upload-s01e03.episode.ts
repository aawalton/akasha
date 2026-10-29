import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS01e03 = {
  id: "01a18859-6797-7b07-9c82-3cd384ee0b89",
  type: "page-type/episode",
  slug: "upload-s01e03",
  description:
    "Scientists attempt to download a consciousness back into a clone body. Nathan attends his own funeral and Nora uncovers a mystery surrounding his death.",
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-1"],
  position: 3,
  publishedAt: "2020-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2249644",
      externalLink: "https://www.themoviedb.org/tv/86248/season/1/episode/3",
    },
  ],
  title: "The Funeral",
  episodeType: "standard",
  stillPath: "/2UtgKeT9TMfDfamOzwnws6YukCU.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
