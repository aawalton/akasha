import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixAtHome = {
  id: "01a0676a-d717-7038-970a-4130766cc7ea",
  type: "page-type/release",
  slug: "pentatonix-at-home",
  title: "At Home",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-06-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1dprzJcVnHpH6PPUNs8O7k",
      externalLink: "https://open.spotify.com/album/1dprzJcVnHpH6PPUNs8O7k",
    },
  ],
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
