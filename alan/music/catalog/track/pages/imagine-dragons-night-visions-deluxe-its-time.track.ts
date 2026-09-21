import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeItsTime = {
  id: "01a0c43f-d6b0-7db7-a7cc-96d5bfe9ef9a",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-its-time",
  ownLength: 3.9664333333333333,
  ownProgress: 3.9664333333333333,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7pUYFGnZwLa7I3UmDypJGy",
      externalLink: "https://open.spotify.com/track/7pUYFGnZwLa7I3UmDypJGy",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "It's Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "itstime|53XhwfbYqKCa1cC15pYq2q|237986",
  song: "song/imagine-dragons-it-s-time",
} as const satisfies Track
