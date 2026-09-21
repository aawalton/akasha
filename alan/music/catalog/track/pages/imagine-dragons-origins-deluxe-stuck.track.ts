import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeStuck = {
  id: "01a0c43f-c8fe-7b11-9de9-edd4a5c8665b",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-stuck",
  ownLength: 3.1808833333333335,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Z9SQPYU95S6M1vcbLsDt2",
      externalLink: "https://open.spotify.com/track/5Z9SQPYU95S6M1vcbLsDt2",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Stuck",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "stuck|53XhwfbYqKCa1cC15pYq2q|190853",
  song: "song/imagine-dragons-stuck",
} as const satisfies Track
