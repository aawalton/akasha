import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonCreepLiveCreepLive = {
  id: "01a0a5ae-da8f-7176-b7ba-b0253d6f2e9f",
  type: "page-type/track",
  slug: "kelly-clarkson-creep-live-creep-live",
  ownLength: 4.142433333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-creep-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3knblvtjbcTtEk0HCiJHZK",
      externalLink: "https://open.spotify.com/track/3knblvtjbcTtEk0HCiJHZK",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Creep - Live",
} as const satisfies Track
