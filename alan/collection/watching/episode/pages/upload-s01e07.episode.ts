import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS01e07 = {
  id: "01a18859-6797-7c86-bb92-d4f86766d71d",
  type: "page-type/episode",
  slug: "upload-s01e07",
  description:
    "Nathan takes Nora’s dad on a do-or-die upload decision tour, but things go awry when Luddites sabotage Lakeview. Nora does some sleuthing on Lucy’s computer in the confusion.",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-1"],
  position: 7,
  publishedAt: "2020-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2249648",
      externalLink: "https://www.themoviedb.org/tv/86248/season/1/episode/7",
    },
  ],
  title: "Bring Your Dad to Work Day",
  episodeType: "standard",
  stillPath: "/54AY7oVf7JPYhxO3pp5lAY2eODH.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
