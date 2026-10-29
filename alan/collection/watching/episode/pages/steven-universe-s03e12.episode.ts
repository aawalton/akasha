import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e12 = {
  id: "01a18855-67e9-730f-b116-0c2c032108b9",
  type: "page-type/episode",
  slug: "steven-universe-s03e12",
  description: "Steven settles a rivalry between restaurant owners.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 12,
  publishedAt: "2016-07-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1209606",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/12",
    },
  ],
  title: "Restaurant Wars",
  episodeType: "standard",
  stillPath: "/oI3ZTJNwMw0wPG4sJcAfnnIEoAH.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
