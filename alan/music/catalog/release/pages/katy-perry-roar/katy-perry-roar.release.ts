import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryRoar = {
  id: "01a0676a-d728-7015-aaa5-0783a245ddf7",
  type: "page-type/release",
  slug: "katy-perry-roar",
  title: "Roar",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 3.7111,
  ownProgress: 3.7111,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7tl8VkZBE0bSMaMcqscnCk",
      externalLink: "https://open.spotify.com/album/7tl8VkZBE0bSMaMcqscnCk",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
