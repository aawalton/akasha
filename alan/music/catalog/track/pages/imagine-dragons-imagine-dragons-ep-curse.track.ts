import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsImagineDragonsEpCurse = {
  id: "01a0c43f-e7d5-7d9c-88a3-a08fa1ffa0a2",
  type: "page-type/track",
  slug: "imagine-dragons-imagine-dragons-ep-curse",
  ownLength: 3.76555,
  ownProgress: 3.76555,
  partOfCollections: ["release/imagine-dragons-imagine-dragons-ep"],
  position: 4,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0qWWWKe24PhXqVNcJZlbeO",
      externalLink: "https://open.spotify.com/track/0qWWWKe24PhXqVNcJZlbeO",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Curse",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "curse|53XhwfbYqKCa1cC15pYq2q|225933",
  song: "song/imagine-dragons-curse",
  carriedBy: [
    {
      release: "release/imagine-dragons-imagine-dragons-ep",
      discNumber: 1,
      position: 4,
      externalId: "0qWWWKe24PhXqVNcJZlbeO",
      externalLink: "https://open.spotify.com/track/0qWWWKe24PhXqVNcJZlbeO",
    },
  ],
} as const satisfies Track
