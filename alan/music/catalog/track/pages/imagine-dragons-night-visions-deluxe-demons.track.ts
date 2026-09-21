import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeDemons = {
  id: "01a0c43f-d6db-7af2-a0c8-c5c84cf87ee7",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-demons",
  ownLength: 2.92,
  ownProgress: 2.92,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  position: 4,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Ntj0hZfncXCQ5hij7igIE",
      externalLink: "https://open.spotify.com/track/1Ntj0hZfncXCQ5hij7igIE",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Demons",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "demons|53XhwfbYqKCa1cC15pYq2q|175200",
  song: "song/imagine-dragons-demons",
} as const satisfies Track
