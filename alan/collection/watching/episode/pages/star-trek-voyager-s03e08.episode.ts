import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e08 = {
  id: "01a18853-ac8c-71ec-890b-b55a9c7eff0a",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e08",
  description:
    "Stardate: Unknown. Voyager is attacked by a Timeship from 500 years in the future, but the two ships are hurled into the past and Voyager is stranded in the year 1996.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 8,
  publishedAt: "1996-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113110",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/8",
    },
  ],
  title: "Future's End (1)",
  episodeType: "standard",
  stillPath: "/kGnvrBH3imIpsdWedUmWQpH26D5.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
