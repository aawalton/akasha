import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS02e45 = {
  id: "01a183d3-f485-7979-afde-7f76271e4564",
  type: "page-type/episode",
  slug: "bleach-s02e45",
  description:
    "Confronting Yhwach, Ichigo awakens the power of the Hollow deep within, becoming Demi-Hollowfied.",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-2"],
  position: 45,
  publishedAt: "2026-08-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7470575",
      externalLink: "https://www.themoviedb.org/tv/30984/season/2/episode/45",
    },
  ],
  title: "DEFEND YOU",
  episodeType: "standard",
  stillPath: "/orlvcN6XDzEbuD7NuxJpMLC5hsc.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
