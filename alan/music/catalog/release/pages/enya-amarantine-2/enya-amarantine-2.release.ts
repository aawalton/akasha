import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaAmarantine2 = {
  id: "01a0676a-d716-7039-975b-c8d52d1f1d35",
  type: "page-type/release",
  slug: "enya-amarantine-2",
  title: "Amarantine",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-11-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2efGoxVxoX55EATLcD0o8y",
      externalLink: "https://open.spotify.com/album/2efGoxVxoX55EATLcD0o8y",
    },
  ],
  createdAt: "2026-09-03T13:17:30.262Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
