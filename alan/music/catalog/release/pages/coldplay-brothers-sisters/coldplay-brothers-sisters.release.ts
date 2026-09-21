import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayBrothersSisters = {
  id: "01a0676a-d719-703d-96b6-071f71531674",
  type: "page-type/release",
  slug: "coldplay-brothers-sisters",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "1999-04-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1As5m9qcOZtuFzdlzCkrzI",
      externalLink: "https://open.spotify.com/album/1As5m9qcOZtuFzdlzCkrzI",
    },
  ],
  title: "Brothers & Sisters",
} as const satisfies Release
