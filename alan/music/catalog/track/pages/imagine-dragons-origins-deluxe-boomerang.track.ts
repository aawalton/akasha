import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeBoomerang = {
  id: "01a0c43f-c78b-70d6-9a0e-e481fbe94665",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-boomerang",
  ownLength: 3.13,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2B1fuWoWaYnCXbjYp1gXg5",
      externalLink: "https://open.spotify.com/track/2B1fuWoWaYnCXbjYp1gXg5",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Boomerang",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "boomerang|53XhwfbYqKCa1cC15pYq2q|187800",
  song: "song/imagine-dragons-boomerang",
} as const satisfies Track
