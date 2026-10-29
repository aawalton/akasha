import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e11 = {
  id: "01a18885-00fa-7e9a-86d8-e9847eaa1095",
  type: "page-type/episode",
  slug: "studio-c-s03e11",
  description:
    "Along with witty commentary from the cast, Studio C brings you the Top 10 favorite sketches from Season 1.",
  ownLength: 55,
  ownProgress: 55,
  partOfCollections: ["season/studio-c-season-3"],
  position: 11,
  publishedAt: "2013-11-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580158",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/11",
    },
  ],
  title: "Season 1 Favorites",
  episodeType: "standard",
  stillPath: "/y3VTbBiYDnWoOPN4yDHnGjzYFej.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
