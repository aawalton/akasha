import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDemons = {
  id: "01a0c43f-d4d1-7d1a-baec-b552951a95b6",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-demons",
  ownLength: 2.92,
  ownProgress: 2.92,
  partOfCollections: ["release/imagine-dragons-night-visions"],
  position: 4,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3LlAyCYU26dvFZBDUIMb7a",
      externalLink: "https://open.spotify.com/track/3LlAyCYU26dvFZBDUIMb7a",
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
