import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryHighOnYourSupply = {
  id: "01a0676a-d720-703a-904d-296b553f365d",
  type: "page-type/release",
  slug: "katy-perry-high-on-your-supply",
  title: "High On Your Supply",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 4,
  ownProgress: 4,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-08-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "23pP2rH6PSynSE5qJuDg0n",
      externalLink: "https://open.spotify.com/album/23pP2rH6PSynSE5qJuDg0n",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
