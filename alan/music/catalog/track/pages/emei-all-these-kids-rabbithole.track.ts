import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiAllTheseKidsRabbithole = {
  id: "01a0c43e-79c2-709f-96d9-71c49f667a64",
  type: "page-type/track",
  slug: "emei-all-these-kids-rabbithole",
  ownLength: 2.3573833333333334,
  ownProgress: 0,
  partOfCollections: ["release/emei-all-these-kids"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0onhIULeudqAHzp2MSPWc4",
      externalLink: "https://open.spotify.com/track/0onhIULeudqAHzp2MSPWc4",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "RABBITHOLE",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "rabbithole|7E2aQQjErJocovYFjYLzWU|141443",
  song: "song/emei-rabbithole",
} as const satisfies Track
