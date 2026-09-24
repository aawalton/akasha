import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaBetter2gether = {
  id: "01a0676a-d718-704b-88db-752c16a263ed",
  type: "page-type/release",
  slug: "rockapella-better-2gether",
  title: "Better 2gether",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 2.859916666666667,
  ownProgress: 2.859917,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-11-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1GNLyq4tFZx5tJpz3SKPTz",
      externalLink: "https://open.spotify.com/album/1GNLyq4tFZx5tJpz3SKPTz",
    },
  ],
} as const satisfies Release
