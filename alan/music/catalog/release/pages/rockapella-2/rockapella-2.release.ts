import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapella2 = {
  id: "01a0676a-d714-701a-bdd6-2a368ff20e34",
  type: "page-type/release",
  slug: "rockapella-2",
  title: "2",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2000-03-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7nHrVjQPlmyq0yhpfhuUBU",
      externalLink: "https://open.spotify.com/album/7nHrVjQPlmyq0yhpfhuUBU",
    },
  ],
  createdAt: "2026-09-03T13:17:30.260Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
