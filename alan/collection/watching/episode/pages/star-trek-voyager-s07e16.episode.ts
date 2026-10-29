import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e16 = {
  id: "01a18853-ac92-74bd-a961-bfcaffcf75a0",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e16",
  description:
    "Stardate: 54584.3 - The Voyager crew is abducted to an alien world, where their memories are altered and they are dropped into the large population of an industrial labor force.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 16,
  publishedAt: "2001-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466842",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/16",
    },
  ],
  title: "Workforce (1)",
  episodeType: "standard",
  stillPath: "/tHv8x00hlYAshwLggKQJtloNMou.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
