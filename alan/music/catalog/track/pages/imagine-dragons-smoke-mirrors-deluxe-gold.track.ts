import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeGold = {
  id: "01a0c43f-cf27-7be0-b7a4-cc21c2b01d13",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-gold",
  ownLength: 3.61355,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors-deluxe"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3pgDkYNYH7hMCl5Njib24j",
      externalLink: "https://open.spotify.com/track/3pgDkYNYH7hMCl5Njib24j",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Gold",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "gold|53XhwfbYqKCa1cC15pYq2q|216813",
  song: "song/imagine-dragons-gold",
} as const satisfies Track
