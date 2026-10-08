import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerry365Remixes = {
  id: "01a0676a-d715-7009-baea-79b1e1ae04f9",
  type: "page-type/release",
  slug: "katy-perry-365-remixes",
  title: "365 (Remixes)",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 13.477267,
  ownProgress: 13.477267,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-03-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7gTwELYieNEJjBhmPvOm71",
      externalLink: "https://open.spotify.com/album/7gTwELYieNEJjBhmPvOm71",
    },
  ],
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
