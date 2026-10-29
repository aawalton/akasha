import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e05 = {
  id: "01a18853-ac92-7bc4-8e24-1dad3900870c",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e05",
  description:
    "Stardate: Unknown - The Doctor is abducted from Voyager and forced to work in a hospital where patients are treated based on their social status.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 5,
  publishedAt: "2000-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466825",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/5",
    },
  ],
  title: "Critical Care",
  episodeType: "standard",
  stillPath: "/xPt7ja7kdFuyGJ0Q2hao5W5I5rk.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
