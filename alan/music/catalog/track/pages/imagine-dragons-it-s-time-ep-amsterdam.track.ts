import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsItSTimeEpAmsterdam = {
  id: "01a0c43f-e451-7694-a81e-fe4f810660ef",
  type: "page-type/track",
  slug: "imagine-dragons-it-s-time-ep-amsterdam",
  ownLength: 4.084216666666666,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-it-s-time-ep"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1bWB2ghKfcXTUGV7wy3ukQ",
      externalLink: "https://open.spotify.com/track/1bWB2ghKfcXTUGV7wy3ukQ",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Amsterdam",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "amsterdam|53XhwfbYqKCa1cC15pYq2q|245053",
  song: "song/imagine-dragons-amsterdam",
} as const satisfies Track
