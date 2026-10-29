import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e12 = {
  id: "01a18853-ac91-7d32-894f-ad753f812b72",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e12",
  description:
    "Stardate: Unknown. Voyager becomes the target of a society it inadvertently helped to create within a short period of time.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 12,
  publishedAt: "2000-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113317",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/12",
    },
  ],
  title: "Blink of an Eye",
  episodeType: "standard",
  stillPath: "/hBNb6kxNNVckAr4XJPJIBZnC15g.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
