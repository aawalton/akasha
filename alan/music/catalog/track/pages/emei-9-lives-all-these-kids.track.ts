import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emei9LivesAllTheseKids = {
  id: "01a0c43e-790a-7de7-b71e-3dc2ad163ac4",
  type: "page-type/track",
  slug: "emei-9-lives-all-these-kids",
  ownLength: 1.9515166666666666,
  ownProgress: 1.9515166666666666,
  partOfCollections: ["release/emei-9-lives"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2lWgmCLkKt9KYjf60ZeZs9",
      externalLink: "https://open.spotify.com/track/2lWgmCLkKt9KYjf60ZeZs9",
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
  carriedBy: [
    {
      release: "release/emei-9-lives",
      discNumber: 1,
      position: 2,
      externalId: "2lWgmCLkKt9KYjf60ZeZs9",
      externalLink: "https://open.spotify.com/track/2lWgmCLkKt9KYjf60ZeZs9",
    },
  ],
} as const satisfies Track
