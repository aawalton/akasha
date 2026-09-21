import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsEveryNight = {
  id: "01a0c43f-d574-7702-83fc-f3777fdbb5b4",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-every-night",
  ownLength: 3.592216666666667,
  ownProgress: 3.592216666666667,
  partOfCollections: ["release/imagine-dragons-night-visions"],
  position: 8,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3WQZfz5DLbO2vnJDWNxRBf",
      externalLink: "https://open.spotify.com/track/3WQZfz5DLbO2vnJDWNxRBf",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Every Night",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "everynight|53XhwfbYqKCa1cC15pYq2q|215533",
  song: "song/imagine-dragons-every-night",
} as const satisfies Track
