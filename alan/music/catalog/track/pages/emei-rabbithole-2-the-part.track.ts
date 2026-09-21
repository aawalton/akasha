import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiRabbithole2ThePart = {
  id: "01a0c43e-78bc-7ed6-a6c5-201160b3ee0a",
  type: "page-type/track",
  slug: "emei-rabbithole-2-the-part",
  ownLength: 2.7420833333333334,
  ownProgress: 0,
  partOfCollections: ["release/emei-rabbithole-2"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2RCZZqbvNR5pEORY3p8PY2",
      externalLink: "https://open.spotify.com/track/2RCZZqbvNR5pEORY3p8PY2",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "THE PART",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "thepart|7E2aQQjErJocovYFjYLzWU|164525",
  song: "song/emei-the-part",
} as const satisfies Track
