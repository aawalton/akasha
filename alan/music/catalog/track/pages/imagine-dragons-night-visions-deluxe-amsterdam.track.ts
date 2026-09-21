import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeAmsterdam = {
  id: "01a0c43f-d72f-77ac-a6ef-4b48450dc8ff",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-amsterdam",
  ownLength: 4.023766666666667,
  ownProgress: 4.023766666666667,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  position: 6,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wBIDJLDvo0h0u1mKU9Bm6",
      externalLink: "https://open.spotify.com/track/3wBIDJLDvo0h0u1mKU9Bm6",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Amsterdam",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "amsterdam|53XhwfbYqKCa1cC15pYq2q|241426",
  song: "song/imagine-dragons-amsterdam",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 6,
      externalId: "3wBIDJLDvo0h0u1mKU9Bm6",
      externalLink: "https://open.spotify.com/track/3wBIDJLDvo0h0u1mKU9Bm6",
    },
  ],
} as const satisfies Track
