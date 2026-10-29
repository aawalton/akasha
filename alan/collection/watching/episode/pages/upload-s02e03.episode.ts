import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS02e03 = {
  id: "01a18859-6798-70ad-8ae1-806694dc3b15",
  type: "page-type/episode",
  slug: "upload-s02e03",
  description:
    "Frustrated with the inequities at Lakeview, Nathan and Luke decide to redistribute some wealth with Ingrid's unwitting help. Nora undertakes a secretive mission.",
  ownLength: 34,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-2"],
  position: 3,
  publishedAt: "2022-03-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3505479",
      externalLink: "https://www.themoviedb.org/tv/86248/season/2/episode/3",
    },
  ],
  title: "Robin Hood",
  episodeType: "standard",
  stillPath: "/rQBZLOZLk4XeH9NNkU41LwbbC07.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
