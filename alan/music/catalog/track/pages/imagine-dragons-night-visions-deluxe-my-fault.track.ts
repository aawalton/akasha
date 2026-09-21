import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeMyFault = {
  id: "01a0c43f-d82b-7847-9d86-828b337e986f",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-my-fault",
  ownLength: 2.9222166666666665,
  ownProgress: 2.9222166666666665,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  position: 12,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5WZn6AJc3D8xM58UqPlco9",
      externalLink: "https://open.spotify.com/track/5WZn6AJc3D8xM58UqPlco9",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "My Fault",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "myfault|53XhwfbYqKCa1cC15pYq2q|175333",
  song: "song/imagine-dragons-my-fault",
} as const satisfies Track
