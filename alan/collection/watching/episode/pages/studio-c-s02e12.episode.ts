import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS02e12 = {
  id: "01a18885-00f9-7bad-9555-0e0f79fcf770",
  type: "page-type/episode",
  slug: "studio-c-s02e12",
  description:
    "The weatherman gives his final five-day forecast, Gollum tries to work out his issues, and Shoulder Angel overcomes the Secret Service.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-2"],
  position: 12,
  publishedAt: "2013-06-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383579",
      externalLink: "https://www.themoviedb.org/tv/68207/season/2/episode/12",
    },
  ],
  title: "Season 2 Episode 12",
  episodeType: "finale",
  stillPath: "/zQJweLgOUNtw2mZTunCh2iOqmHc.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
