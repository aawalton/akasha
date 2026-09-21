import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiIrresponsibleIrresponsible = {
  id: "01a0c43e-7b75-73c8-a2c6-50571a9ea213",
  type: "page-type/track",
  slug: "emei-irresponsible-irresponsible",
  ownLength: 2.0791833333333334,
  ownProgress: 2.0791833333333334,
  partOfCollections: ["release/emei-irresponsible"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "60SugyNV4FdewZfktXfXte",
      externalLink: "https://open.spotify.com/track/60SugyNV4FdewZfktXfXte",
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
      release: "release/emei-irresponsible",
      discNumber: 1,
      position: 1,
      externalId: "60SugyNV4FdewZfktXfXte",
      externalLink: "https://open.spotify.com/track/60SugyNV4FdewZfktXfXte",
    },
  ],
} as const satisfies Track
