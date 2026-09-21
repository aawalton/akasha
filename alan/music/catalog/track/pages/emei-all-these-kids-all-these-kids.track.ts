import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiAllTheseKidsAllTheseKids = {
  id: "01a0c43e-799b-7b3b-83f6-1dc45b50ee02",
  type: "page-type/track",
  slug: "emei-all-these-kids-all-these-kids",
  ownLength: 1.9515166666666666,
  ownProgress: 0,
  partOfCollections: ["release/emei-all-these-kids"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4GCMUoBhLMELZ9yf1xHQbc",
      externalLink: "https://open.spotify.com/track/4GCMUoBhLMELZ9yf1xHQbc",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "ALL THESE KIDS",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "allthesekids|7E2aQQjErJocovYFjYLzWU|117091",
  song: "song/emei-all-these-kids",
} as const satisfies Track
