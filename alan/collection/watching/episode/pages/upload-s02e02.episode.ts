import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS02e02 = {
  id: "01a18859-6798-78e5-8a60-0d0c9adff16f",
  type: "page-type/episode",
  slug: "upload-s02e02",
  description:
    "At a status-obsessed dinner, Nathan faces ghosts from his past. Nora flexes her programming skills as she steps into activism.",
  ownLength: 34,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-2"],
  position: 2,
  publishedAt: "2022-03-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3505478",
      externalLink: "https://www.themoviedb.org/tv/86248/season/2/episode/2",
    },
  ],
  title: "Dinner Party",
  episodeType: "standard",
  stillPath: "/wQpYLfCO0TPi80x3qN8i02enHab.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
