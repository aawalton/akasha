import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsItSTimeEpTokyo = {
  id: "01a0c43f-e47a-7b70-8b58-2de72b64698c",
  type: "page-type/track",
  slug: "imagine-dragons-it-s-time-ep-tokyo",
  ownLength: 3.276883333333333,
  ownProgress: 3.276883333333333,
  partOfCollections: ["release/imagine-dragons-it-s-time-ep"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4epZ5ws5c3rIwI2pqgHD6P",
      externalLink: "https://open.spotify.com/track/4epZ5ws5c3rIwI2pqgHD6P",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Tokyo",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "tokyo|53XhwfbYqKCa1cC15pYq2q|196613",
  song: "song/imagine-dragons-tokyo",
  carriedBy: [
    {
      release: "release/imagine-dragons-it-s-time-ep",
      discNumber: 1,
      position: 3,
      externalId: "4epZ5ws5c3rIwI2pqgHD6P",
      externalLink: "https://open.spotify.com/track/4epZ5ws5c3rIwI2pqgHD6P",
    },
  ],
} as const satisfies Track
