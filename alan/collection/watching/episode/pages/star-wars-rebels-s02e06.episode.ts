import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e06 = {
  id: "01a18853-ddfd-76e5-87ed-821e654aecf7",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e06",
  description:
    "On a mission to escort a courier with secret information vital to the rebel cause to a rendezvous point, Sabine must face off against her old friend and partner.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 6,
  publishedAt: "2015-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1135847",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/6",
    },
  ],
  title: "Blood Sisters",
  episodeType: "standard",
  stillPath: "/4u8DYA6UWT3sxzEHuDKZX9bdSTC.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
