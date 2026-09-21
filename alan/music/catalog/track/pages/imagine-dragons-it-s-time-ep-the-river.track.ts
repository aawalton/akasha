import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsItSTimeEpTheRiver = {
  id: "01a0c43f-e4a3-7aa1-b5e5-75f7749a6fd3",
  type: "page-type/track",
  slug: "imagine-dragons-it-s-time-ep-the-river",
  ownLength: 3.4171,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-it-s-time-ep"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "41zwUx62ysDe6nwWBh0OgF",
      externalLink: "https://open.spotify.com/track/41zwUx62ysDe6nwWBh0OgF",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "The River",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "theriver|53XhwfbYqKCa1cC15pYq2q|205026",
  song: "song/imagine-dragons-the-river",
} as const satisfies Track
