import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishBitchesBrokenHeartsBitchesBrokenHearts = {
  id: "01a0b638-eacf-7d03-9ab4-93f5a2dfd30c",
  type: "page-type/track",
  slug: "billie-eilish-bitches-broken-hearts-bitches-broken-hearts",
  ownLength: 2.9411833333333335,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-bitches-broken-hearts"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5t3Vk8bRKylx4fjj7qlbib",
      externalLink: "https://open.spotify.com/track/5t3Vk8bRKylx4fjj7qlbib",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "bitches broken hearts",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "bitchesbrokenhearts|6qqNVTkY8uBg9cP3Jd7DAH|176471",
} as const satisfies Track
