import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiRabbithole2AllTheseKids = {
  id: "01a0c43e-77f5-7971-a98f-c9a8b01b66e4",
  type: "page-type/track",
  slug: "emei-rabbithole-2-all-these-kids",
  ownLength: 1.9515166666666666,
  ownProgress: 1.9515166666666666,
  partOfCollections: ["release/emei-rabbithole-2"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4RgD26YY5ohlaMkkIqHh0J",
      externalLink: "https://open.spotify.com/track/4RgD26YY5ohlaMkkIqHh0J",
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
