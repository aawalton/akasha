import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS02e02 = {
  id: "01a18885-00f9-7168-bef9-ba6b65829ce4",
  type: "page-type/episode",
  slug: "studio-c-s02e02",
  description:
    "The TSA tries to stop true love, da Vinci finds difficulty in painting his latest portrait, and the high school spelling bee gets an update.",
  ownLength: 26,
  ownProgress: 26,
  partOfCollections: ["season/studio-c-season-2"],
  position: 2,
  publishedAt: "2013-04-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383561",
      externalLink: "https://www.themoviedb.org/tv/68207/season/2/episode/2",
    },
  ],
  title: "Season 2 Episode 2",
  episodeType: "standard",
  stillPath: "/q9BNAfUSP2MLFmnp6q7iZfxQq3s.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
