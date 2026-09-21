import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiRabbitholeRabbithole = {
  id: "01a0c43e-79e9-7fb7-99eb-0cf56b411cc4",
  type: "page-type/track",
  slug: "emei-rabbithole-rabbithole",
  ownLength: 2.3573833333333334,
  ownProgress: 2.3573833333333334,
  partOfCollections: ["release/emei-rabbithole"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5NVnK2Ct25u1enmwdWAdkR",
      externalLink: "https://open.spotify.com/track/5NVnK2Ct25u1enmwdWAdkR",
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
  carriedBy: [
    {
      release: "release/emei-rabbithole",
      discNumber: 1,
      position: 1,
      externalId: "5NVnK2Ct25u1enmwdWAdkR",
      externalLink: "https://open.spotify.com/track/5NVnK2Ct25u1enmwdWAdkR",
    },
  ],
} as const satisfies Track
