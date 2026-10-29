import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const runawaysS01e01 = {
  id: "01a18851-864a-71ab-9f5b-0f8bdec4d332",
  type: "page-type/episode",
  slug: "runaways-s01e01",
  description:
    "A group of six Los Angeles teens, fractured by a tragic loss, reunite only to discover that their parents may be hiding a terrible secret that turns their world upside down.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-runaways-season-1"],
  position: 1,
  publishedAt: "2017-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1215640",
      externalLink: "https://www.themoviedb.org/tv/67466/season/1/episode/1",
    },
  ],
  title: "Reunion",
  episodeType: "standard",
  stillPath: "/7AyyZXC9vCo4u7osOJrtyoDz3hH.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:40:06.602Z",
  updatedAt: "2026-10-29T15:40:06.602Z",
} as const satisfies Episode
