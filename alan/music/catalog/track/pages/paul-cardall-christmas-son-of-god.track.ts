import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasSonOfGod = {
  id: "01a0b4c8-3502-7df7-9e17-7f6854570165",
  type: "page-type/track",
  slug: "paul-cardall-christmas-son-of-god",
  ownLength: 4.57275,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4KQ8C57YW73VaMLXDK8Z0n",
      externalLink: "https://open.spotify.com/track/4KQ8C57YW73VaMLXDK8Z0n",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Son of God",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
    { externalId: "77dRSdJKCKDOen5hjPYO0D", artistName: "Patrice Tipoki" },
  ],
  trackKey: "sonofgod|77dRSdJKCKDOen5hjPYO0D,7FQRbf8gbKw8KZQZAJWxH2|274365",
  song: "song/paul-cardall-son-of-god",
} as const satisfies Track
