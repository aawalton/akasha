import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const bleachSeason2 = {
  id: "01a183d3-f485-7865-a471-efcb052ee63a",
  type: "page-type/season",
  slug: "bleach-season-2",
  description:
    "The final arc of the Bleach series, where Ichigo Kurosaki and the Soul Reapers face off against the powerful Quincy army, led by Yhwach, in a battle that threatens the balance of all worlds.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/bleach"],
  position: 2,
  publishedAt: "2022-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "295738",
      externalLink: "https://www.themoviedb.org/tv/30984/season/2",
    },
  ],
  title: "Thousand-Year Blood War",
  posterPath: "/xAiiPhRm1zOyPwBLjcA2RsFtG8G.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Season
