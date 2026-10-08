import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const snailMailValentine2 = {
  id: "01a0676a-d72f-705c-a072-5055f748002a",
  type: "page-type/release",
  slug: "snail-mail-valentine-2",
  title: "Valentine",
  partOfCollections: ["artist/snail-mail"],
  position: 0,
  ownLength: 3.26955,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-09-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4gYRifAy47Kiw1k152e6hv",
      externalLink: "https://open.spotify.com/album/4gYRifAy47Kiw1k152e6hv",
    },
  ],
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-09-15T16:39:19.000Z",
} as const satisfies Release
