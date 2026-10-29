import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e08 = {
  id: "01a18853-ac8d-7248-967c-e085a084e1b8",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e08",
  description:
    "Stardate: 51268.4. The Voyager crew finds its determination and morale challenged when trying to survive a brutal, long-lasting conflict with a race called the Krenim.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 8,
  publishedAt: "1997-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113166",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/8",
    },
  ],
  title: "Year of Hell (1)",
  episodeType: "standard",
  stillPath: "/wG4cJEY1MM9nmlfaIG5VJSicLMH.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
