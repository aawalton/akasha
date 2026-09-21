import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsLoom = {
  id: "01a0676a-d723-7063-9c91-0ba3e3a5a828",
  type: "page-type/release",
  slug: "imagine-dragons-loom",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2024-06-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EPrkhjTBrwAV8yAKCmY0Y",
      externalLink: "https://open.spotify.com/album/7EPrkhjTBrwAV8yAKCmY0Y",
    },
  ],
  title: "LOOM",
} as const satisfies Release
