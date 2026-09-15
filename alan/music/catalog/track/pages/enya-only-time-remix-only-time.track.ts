import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOnlyTimeRemixOnlyTime = {
  id: "01a0a5b0-23c0-773e-9031-8827862e334c",
  type: "track",
  slug: "enya-only-time-remix-only-time",
  ownLength: 3.6424333333333334,
  ownProgress: 0,
  partOfCollections: ["release/enya-only-time-remix"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5PA9GSZqwD3YjgZUcpqVit",
      externalLink: "https://open.spotify.com/track/5PA9GSZqwD3YjgZUcpqVit",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Only Time",
} as const satisfies Track
