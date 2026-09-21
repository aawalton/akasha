import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomTakeMeToTheBeach = {
  id: "01a0c43f-b4c7-7481-a110-6d3bd63cfab7",
  type: "page-type/track",
  slug: "imagine-dragons-loom-take-me-to-the-beach",
  ownLength: 2.784666666666667,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-loom"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Wop6FEmIstWTMeQb0TXcw",
      externalLink: "https://open.spotify.com/track/2Wop6FEmIstWTMeQb0TXcw",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Take Me to the Beach",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "takemetothebeach|53XhwfbYqKCa1cC15pYq2q|167080",
  song: "song/imagine-dragons-take-me-to-the-beach",
} as const satisfies Track
