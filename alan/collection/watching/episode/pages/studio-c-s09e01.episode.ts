import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS09e01 = {
  id: "01a18885-00fe-70f5-b883-bf3a89cdb376",
  type: "page-type/episode",
  slug: "studio-c-s09e01",
  description:
    "The entire Studio C gang is back and funnier than ever as they launch their ninth season with the help of SNL veteran Kenan Thompson. The season premiere was recorded before a live audience in New York City.",
  ownLength: 58,
  ownProgress: 58,
  partOfCollections: ["season/studio-c-season-9"],
  position: 1,
  publishedAt: "2018-09-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1569436",
      externalLink: "https://www.themoviedb.org/tv/68207/season/9/episode/1",
    },
  ],
  title: "Studio C Live From NYC",
  episodeType: "standard",
  stillPath: "/amRLKKY8nZHGfJKhdpNOy1mexpq.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
