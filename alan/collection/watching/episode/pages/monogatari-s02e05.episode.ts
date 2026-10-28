import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monogatariS02e05 = {
  id: "01a183db-7939-79e7-85f8-d76b58c610bc",
  type: "page-type/episode",
  slug: "monogatari-s02e05",
  description:
    "Koyomi learns the whole story about what happened between Karen and Kaiki. After receiving a tempting offer from Hanekawa, he speaks with Shinobu on the way to save Karen.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/monogatari-season-2"],
  position: 5,
  publishedAt: "2012-02-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "907774",
      externalLink: "https://www.themoviedb.org/tv/46195/season/2/episode/5",
    },
  ],
  title: "Karen Bee (5)",
  episodeType: "standard",
  stillPath: "/dk6fRt4S3MPBEH2U0VeGtFFa9lB.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T18:52:41.143Z",
} as const satisfies Episode
