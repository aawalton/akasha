import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e14 = {
  id: "01a18853-ac92-70d6-8cce-ca9dbe0fad36",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e14",
  description:
    "Stardate: 54518.2 - The captain of a Klingon ship on a generational holy mission believes Torres' unborn child may lead them to a new era of enlightenment.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 14,
  publishedAt: "2001-02-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466840",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/14",
    },
  ],
  title: "Prophecy",
  episodeType: "standard",
  stillPath: "/gT1ntr9UlB41OpbZ7Q1AQynhCYD.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
