import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeUnderdog = {
  id: "01a0c43f-d7d5-7505-90de-5d80e8f9e747",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-underdog",
  ownLength: 3.4451,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5QkekEa4chV2jzA6007bD6",
      externalLink: "https://open.spotify.com/track/5QkekEa4chV2jzA6007bD6",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Underdog",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "underdog|53XhwfbYqKCa1cC15pYq2q|206706",
  song: "song/imagine-dragons-underdog",
} as const satisfies Track
