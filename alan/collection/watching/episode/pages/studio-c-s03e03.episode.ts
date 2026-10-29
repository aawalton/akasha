import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e03 = {
  id: "01a18885-00f9-75d0-8e80-cbd49786245a",
  type: "page-type/episode",
  slug: "studio-c-s03e03",
  description: "Mallory testifies to Matt's inability to commit the crime he's accused of.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-3"],
  position: 3,
  publishedAt: "2013-10-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580138",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/3",
    },
  ],
  title: "Season 3 Episode 3",
  episodeType: "standard",
  stillPath: "/3LjyHlg2kDy0rUWIPxma0D1rsal.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
