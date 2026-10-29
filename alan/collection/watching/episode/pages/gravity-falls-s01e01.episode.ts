import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS01e01 = {
  id: "01a18849-545c-71c7-a01d-280efffc6f4b",
  type: "page-type/episode",
  slug: "gravity-falls-s01e01",
  description:
    "Twins Dipper and Mabel Pines visit their eccentric great-uncle for a summer in Gravity Falls, Oregon, where he operates the world's most bizarre museum. As soon as the twins arrive in Gravity Falls, they discover something amiss in the remote town.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-1"],
  position: 1,
  publishedAt: "2012-06-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "871281",
      externalLink: "https://www.themoviedb.org/tv/40075/season/1/episode/1",
    },
  ],
  title: "Tourist Trapped",
  episodeType: "standard",
  stillPath: "/ue9a9TEnZ3u5G83QZGxOfh78mg8.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
