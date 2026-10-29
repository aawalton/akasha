import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e04 = {
  id: "01a18855-67e9-7c2c-8ead-697f029dc2f3",
  type: "page-type/episode",
  slug: "steven-universe-s03e04",
  description: "Steven helps two friends get along at the barn.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 4,
  publishedAt: "2016-05-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1195798",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/4",
    },
  ],
  title: "Barn Mates",
  episodeType: "standard",
  stillPath: "/cZG460kIPTeptTfYVpJbtw29EBi.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
