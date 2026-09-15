import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonOhDarlingLiveOhDarlingLive = {
  id: "01a0a5ae-db12-7fa2-8e8c-1a7fa65e6c70",
  type: "track",
  slug: "kelly-clarkson-oh-darling-live-oh-darling-live",
  ownLength: 3.31745,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-oh-darling-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7MOnZWyBGn8eTDHLL8bI2Y",
      externalLink: "https://open.spotify.com/track/7MOnZWyBGn8eTDHLL8bI2Y",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Oh! Darling - Live",
} as const satisfies Track
