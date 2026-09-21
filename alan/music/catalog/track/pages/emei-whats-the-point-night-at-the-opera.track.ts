import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiWhatsThePointNightAtTheOpera = {
  id: "01a0c43e-71a7-72bb-9007-06ca6e6f25b0",
  type: "page-type/track",
  slug: "emei-whats-the-point-night-at-the-opera",
  ownLength: 3.0798,
  ownProgress: 3.0798,
  partOfCollections: ["release/emei-whats-the-point"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ny1BHRWB54CD5MiBhaOTc",
      externalLink: "https://open.spotify.com/track/1ny1BHRWB54CD5MiBhaOTc",
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
  carriedBy: [
    {
      release: "release/emei-whats-the-point",
      discNumber: 1,
      position: 2,
      externalId: "1ny1BHRWB54CD5MiBhaOTc",
      externalLink: "https://open.spotify.com/track/1ny1BHRWB54CD5MiBhaOTc",
    },
  ],
} as const satisfies Track
