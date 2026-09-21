import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiRabbithole2Sugarcoat = {
  id: "01a0c43e-787c-785b-bc16-91c78cdfad9b",
  type: "page-type/track",
  slug: "emei-rabbithole-2-sugarcoat",
  ownLength: 2.5045,
  ownProgress: 0,
  partOfCollections: ["release/emei-rabbithole-2"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7ds2cvPKeRrbIVHTctkBc4",
      externalLink: "https://open.spotify.com/track/7ds2cvPKeRrbIVHTctkBc4",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "SUGARCOAT",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "sugarcoat|7E2aQQjErJocovYFjYLzWU|150270",
  song: "song/emei-sugarcoat",
} as const satisfies Track
