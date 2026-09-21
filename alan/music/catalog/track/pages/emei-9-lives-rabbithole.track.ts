import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emei9LivesRabbithole = {
  id: "01a0c43e-7930-7b1b-ab84-2bdbf35df065",
  type: "page-type/track",
  slug: "emei-9-lives-rabbithole",
  ownLength: 2.3573833333333334,
  ownProgress: 2.3573833333333334,
  partOfCollections: ["release/emei-9-lives"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4vRtKITmMuwPYckPVaoXwG",
      externalLink: "https://open.spotify.com/track/4vRtKITmMuwPYckPVaoXwG",
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
      release: "release/emei-9-lives",
      discNumber: 1,
      position: 3,
      externalId: "4vRtKITmMuwPYckPVaoXwG",
      externalLink: "https://open.spotify.com/track/4vRtKITmMuwPYckPVaoXwG",
    },
  ],
} as const satisfies Track
