import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrain2Irresponsible = {
  id: "01a0c43e-758f-7845-8466-5e24c06d7ef8",
  type: "page-type/track",
  slug: "emei-scatterbrain-2-irresponsible",
  ownLength: 2.0791833333333334,
  ownProgress: 2.0791833333333334,
  partOfCollections: ["release/emei-scatterbrain-2"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0zlJpc8mUU9x92uU8t5f6p",
      externalLink: "https://open.spotify.com/track/0zlJpc8mUU9x92uU8t5f6p",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Irresponsible",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "irresponsible|7E2aQQjErJocovYFjYLzWU|124751",
  song: "song/emei-irresponsible",
  carriedBy: [
    {
      release: "release/emei-scatterbrain-2",
      discNumber: 1,
      position: 3,
      externalId: "0zlJpc8mUU9x92uU8t5f6p",
      externalLink: "https://open.spotify.com/track/0zlJpc8mUU9x92uU8t5f6p",
    },
  ],
} as const satisfies Track
