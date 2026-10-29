import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e09 = {
  id: "01a18855-67e9-75f3-ae42-73fa9a21ffeb",
  type: "page-type/episode",
  slug: "steven-universe-s03e09",
  description:
    "Steven and Amethyst take a trip to Funland but run into trouble when their friend is too short to ride the rollercoasters.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 9,
  publishedAt: "2016-07-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1207436",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/9",
    },
  ],
  title: "Too Short to Ride",
  episodeType: "standard",
  stillPath: "/dv9O32X08NrVH516g9hI0CSP7pY.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
