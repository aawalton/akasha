import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixPtxVolIii = {
  id: "01a0676a-d727-702f-85a6-e95e06c6d67c",
  type: "page-type/release",
  slug: "pentatonix-ptx-vol-iii",
  title: "PTX, Vol. III",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 24.078617,
  ownProgress: 24.078617,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-09-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "32y54TelUHSUDWVOx4h1B4",
      externalLink: "https://open.spotify.com/album/32y54TelUHSUDWVOx4h1B4",
    },
  ],
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-15T16:38:50.000Z",
} as const satisfies Release
