import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonTalkToMeZara = {
  id: "01a0aa7c-22ee-7dc9-b2b7-a4338ceed963",
  type: "page-type/release",
  slug: "zara-larsson-talk-to-me-zara",
  ownLength: 3.2225,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2026-07-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5geHXgOaOjbB15V5Yx1bqM",
      externalLink: "https://open.spotify.com/album/5geHXgOaOjbB15V5Yx1bqM",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Talk To Me, Zara",
} as const satisfies Release
