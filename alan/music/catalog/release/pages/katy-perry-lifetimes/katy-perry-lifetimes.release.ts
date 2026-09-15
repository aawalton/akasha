import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryLifetimes = {
  id: "01a0676a-d723-702d-becb-e534de027f34",
  type: "release",
  slug: "katy-perry-lifetimes",
  title: "LIFETIMES",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 3.2,
  ownProgress: 3.2,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-08-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6UEGp3MQnsKoK9rwKcKBUo",
      externalLink: "https://open.spotify.com/album/6UEGp3MQnsKoK9rwKcKBUo",
    },
  ],
} as const satisfies Release
