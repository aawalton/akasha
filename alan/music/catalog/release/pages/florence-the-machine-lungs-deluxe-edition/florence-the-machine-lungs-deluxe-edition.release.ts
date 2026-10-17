import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineLungsDeluxeEdition = {
  id: "01a0676a-d724-7018-985f-ca05d32778c0",
  type: "page-type/release",
  slug: "florence-the-machine-lungs-deluxe-edition",
  title: "Lungs (Deluxe Edition)",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2FgknX5e7fJlriQtxvpLhZ",
      externalLink: "https://open.spotify.com/album/2FgknX5e7fJlriQtxvpLhZ",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
