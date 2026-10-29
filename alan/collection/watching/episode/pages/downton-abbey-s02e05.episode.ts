import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const downtonAbbeyS02e05 = {
  id: "01a18847-e986-7761-ba60-b5b3cdb022dc",
  type: "page-type/episode",
  slug: "downton-abbey-s02e05",
  description:
    "Robert receives some shocking news from the front. Daisy's relationship with William moves faster than she would like. Vera threatens to expose old secrets.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/downton-abbey-season-2"],
  position: 5,
  publishedAt: "2011-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779847",
      externalLink: "https://www.themoviedb.org/tv/33907/season/2/episode/5",
    },
  ],
  title: "Episode 5",
  episodeType: "standard",
  stillPath: "/62HTFkyiyAgD1K1KpZH8W7LGBPx.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:29:36.644Z",
  updatedAt: "2026-10-29T15:29:36.644Z",
} as const satisfies Episode
