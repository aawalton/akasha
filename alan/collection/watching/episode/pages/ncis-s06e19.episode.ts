import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e19 = {
  id: "01a1884b-ef69-79dd-8f76-d79f89ef6499",
  type: "page-type/episode",
  slug: "ncis-s06e19",
  description:
    "When a young boy finds a murder weapon, the team must trace ownership of the gun to find who used it last and who was murdered.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 19,
  publishedAt: "2009-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334423",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/19",
    },
  ],
  title: "Hide and Seek",
  episodeType: "standard",
  stillPath: "/sxs3cwmAJuqq4HGKYttTejE2QEa.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
