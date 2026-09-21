import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiEndOfAnEraFerrisBueller = {
  id: "01a0c43e-7c69-7f15-b4a9-f15914153f3d",
  type: "page-type/track",
  slug: "emei-end-of-an-era-ferris-bueller",
  ownLength: 1.954,
  ownProgress: 0,
  partOfCollections: ["release/emei-end-of-an-era"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "14YzvOvrATzkS7f5sJOw2k",
      externalLink: "https://open.spotify.com/track/14YzvOvrATzkS7f5sJOw2k",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Ferris Bueller",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "ferrisbueller|7E2aQQjErJocovYFjYLzWU|117240",
  song: "song/emei-ferris-bueller",
} as const satisfies Track
