import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const wednesdayS02e03 = {
  id: "01a18881-232e-7a43-9e8b-69ecbe4291f6",
  type: "page-type/episode",
  slug: "wednesday-s02e03",
  description:
    "Stripped of both her ability and Goody's book, Wednesday is forced to do some old-fashioned detective work on a school camping trip.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/wednesday-season-2"],
  position: 3,
  publishedAt: "2025-08-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6165594",
      externalLink: "https://www.themoviedb.org/tv/119051/season/2/episode/3",
    },
  ],
  title: "Call of the Woe",
  episodeType: "standard",
  stillPath: "/75n29ly38Sx4XNqXHkIRLpUcIfm.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:32:06.957Z",
  updatedAt: "2026-10-29T16:32:06.957Z",
} as const satisfies Episode
