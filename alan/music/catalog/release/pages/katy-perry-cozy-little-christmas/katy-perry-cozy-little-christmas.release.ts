import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryCozyLittleChristmas = {
  id: "01a0676a-d71b-7031-93d5-3ff7333d44ab",
  type: "page-type/release",
  slug: "katy-perry-cozy-little-christmas",
  title: "Cozy Little Christmas",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 3.042,
  ownProgress: 3.042,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-11-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5IxObv8TvRsYE6DGKnbrXn",
      externalLink: "https://open.spotify.com/album/5IxObv8TvRsYE6DGKnbrXn",
    },
  ],
} as const satisfies Release
