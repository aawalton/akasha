import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOperaNightAtTheOpera = {
  id: "01a0c43e-6ffd-7840-ba45-4c4248848a4a",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-night-at-the-opera",
  ownLength: 3.0798,
  ownProgress: 0,
  partOfCollections: ["release/emei-night-at-the-opera"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "30AyoU0VBI4khIQVVEmqQH",
      externalLink: "https://open.spotify.com/track/30AyoU0VBI4khIQVVEmqQH",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Night at the Opera",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "nightattheopera|7E2aQQjErJocovYFjYLzWU|184788",
  song: "song/emei-night-at-the-opera",
} as const satisfies Track
