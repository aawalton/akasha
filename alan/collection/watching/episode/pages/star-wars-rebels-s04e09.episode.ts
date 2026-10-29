import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e09 = {
  id: "01a18853-ddff-79e9-a109-3d8e0ac3b26b",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e09",
  description:
    "Hera leads a courageous attack against Grand Admiral Thrawn's forces, but when things go awry, her battle to win must become a daring escape if she is to survive.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 9,
  publishedAt: "2017-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1382176",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/9",
    },
  ],
  title: "Rebel Assault",
  episodeType: "standard",
  stillPath: "/mvxU8aaDDtx0D7cbWzD6ohYjU3D.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
