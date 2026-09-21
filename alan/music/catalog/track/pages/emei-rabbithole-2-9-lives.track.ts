import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiRabbithole29Lives = {
  id: "01a0c43e-783a-7257-a79b-9199dc4ff753",
  type: "page-type/track",
  slug: "emei-rabbithole-2-9-lives",
  ownLength: 3.0375833333333335,
  ownProgress: 3.0375833333333335,
  partOfCollections: ["release/emei-rabbithole-2"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "67Zmvqz78sjJwhHyT94DOZ",
      externalLink: "https://open.spotify.com/track/67Zmvqz78sjJwhHyT94DOZ",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "9 LIVES",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "9lives|7E2aQQjErJocovYFjYLzWU|182255",
  song: "song/emei-9-lives",
  carriedBy: [
    {
      release: "release/emei-rabbithole-2",
      discNumber: 1,
      position: 3,
      externalId: "67Zmvqz78sjJwhHyT94DOZ",
      externalLink: "https://open.spotify.com/track/67Zmvqz78sjJwhHyT94DOZ",
    },
  ],
} as const satisfies Track
