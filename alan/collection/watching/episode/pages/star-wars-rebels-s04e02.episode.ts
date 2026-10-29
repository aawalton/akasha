import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e02 = {
  id: "01a18853-ddff-7bd2-9359-30cbe56a7905",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e02",
  description:
    "When Sabine discovers the Empire has resurrected a devastating weapon she created and plans to use it against her people, she must decide whether to destroy it or use it herself.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 2,
  publishedAt: "2017-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1380328",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/2",
    },
  ],
  title: "Heroes of Mandalore (2)",
  episodeType: "standard",
  stillPath: "/16CjEy2UehcBr98wnrm5zNdynvU.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
