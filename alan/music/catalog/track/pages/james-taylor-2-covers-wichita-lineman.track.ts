import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversWichitaLineman = {
  id: "01a0abeb-33f4-757f-b34d-a12706cda5e5",
  type: "page-type/track",
  slug: "james-taylor-2-covers-wichita-lineman",
  ownLength: 3.6871,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-covers"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "368v5JTGPeCAUtqoyZyBRY",
      externalLink: "https://open.spotify.com/track/368v5JTGPeCAUtqoyZyBRY",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Wichita Lineman",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "wichitalineman|0vn7UBvSQECKJm2817Yf1P|221226",
  song: "song/james-taylor-wichita-lineman",
} as const satisfies Track
