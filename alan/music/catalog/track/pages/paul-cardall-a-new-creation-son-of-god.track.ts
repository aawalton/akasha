import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationSonOfGod = {
  id: "01a0b4c8-3606-7e68-9260-1671bb812bd4",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-son-of-god",
  ownLength: 4.0531,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5oo5GpimvkCxTYDrwIPTH9",
      externalLink: "https://open.spotify.com/track/5oo5GpimvkCxTYDrwIPTH9",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Son of God",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
    { externalId: "77dRSdJKCKDOen5hjPYO0D", artistName: "Patrice Tipoki" },
  ],
  trackKey: "sonofgod|77dRSdJKCKDOen5hjPYO0D,7FQRbf8gbKw8KZQZAJWxH2|243186",
} as const satisfies Track
