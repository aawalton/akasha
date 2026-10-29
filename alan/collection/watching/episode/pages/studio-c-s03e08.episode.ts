import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e08 = {
  id: "01a18885-00fa-7ab2-adcf-ee7953b757d5",
  type: "page-type/episode",
  slug: "studio-c-s03e08",
  description:
    "An inventor has each of his brilliant ideas ruined, and a couple on a hike assists a stranger.",
  ownLength: 27,
  ownProgress: 27,
  partOfCollections: ["season/studio-c-season-3"],
  position: 8,
  publishedAt: "2013-11-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580144",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/8",
    },
  ],
  title: "Season 3 Episode 8",
  episodeType: "standard",
  stillPath: "/4b2zklz4gOGPDLz6NwrdEEys8rA.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
