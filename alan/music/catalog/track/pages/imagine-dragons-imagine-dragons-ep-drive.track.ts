import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsImagineDragonsEpDrive = {
  id: "01a0c43f-e820-7341-a9d1-d6f5a32b919f",
  type: "page-type/track",
  slug: "imagine-dragons-imagine-dragons-ep-drive",
  ownLength: 4.534,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-imagine-dragons-ep"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3FmZu1Qbdh2S0uWl1u2Czo",
      externalLink: "https://open.spotify.com/track/3FmZu1Qbdh2S0uWl1u2Czo",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Drive",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "drive|53XhwfbYqKCa1cC15pYq2q|272040",
  song: "song/imagine-dragons-drive",
} as const satisfies Track
