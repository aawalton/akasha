import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaAmarantine = {
  id: "01a0676a-d716-7038-9347-59388ece1bfc",
  type: "page-type/release",
  slug: "enya-amarantine",
  title: "Amarantine",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 8.759316666666667,
  ownProgress: 8.759317,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-11-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3GMARsojMQpvAQqmFMR60g",
      externalLink: "https://open.spotify.com/album/3GMARsojMQpvAQqmFMR60g",
    },
  ],
  createdAt: "2026-09-03T13:17:30.262Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Release
