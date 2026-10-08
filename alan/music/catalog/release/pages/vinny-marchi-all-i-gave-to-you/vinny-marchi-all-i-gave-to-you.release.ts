import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiAllIGaveToYou = {
  id: "01a0676a-d716-701a-8f65-5a1a74d04e70",
  type: "page-type/release",
  slug: "vinny-marchi-all-i-gave-to-you",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2021-12-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "06KBUekXXpeGFt7aEgsTJK",
      externalLink: "https://open.spotify.com/album/06KBUekXXpeGFt7aEgsTJK",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "all i gave to you",
  createdAt: "2026-09-03T13:17:30.262Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
