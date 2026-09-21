import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiThatGirlThatGirl = {
  id: "01a0c43e-7ddc-7099-b814-2b880157f34f",
  type: "page-type/track",
  slug: "emei-that-girl-that-girl",
  ownLength: 2.3404333333333334,
  ownProgress: 2.3404333333333334,
  partOfCollections: ["release/emei-that-girl"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5UebR77vjap8LVd6eqITiY",
      externalLink: "https://open.spotify.com/track/5UebR77vjap8LVd6eqITiY",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "That Girl",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "thatgirl|7E2aQQjErJocovYFjYLzWU|140426",
  song: "song/emei-that-girl",
} as const satisfies Track
