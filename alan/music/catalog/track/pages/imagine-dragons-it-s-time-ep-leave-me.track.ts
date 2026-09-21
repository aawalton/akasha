import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsItSTimeEpLeaveMe = {
  id: "01a0c43f-e4cd-7bbc-9a96-1b5913982da7",
  type: "page-type/track",
  slug: "imagine-dragons-it-s-time-ep-leave-me",
  ownLength: 3.5222166666666666,
  ownProgress: 3.5222166666666666,
  partOfCollections: ["release/imagine-dragons-it-s-time-ep"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3qasfRKlw6cGDbDhPfZJ8h",
      externalLink: "https://open.spotify.com/track/3qasfRKlw6cGDbDhPfZJ8h",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Leave Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "leaveme|53XhwfbYqKCa1cC15pYq2q|211333",
  song: "song/imagine-dragons-leave-me",
  carriedBy: [
    {
      release: "release/imagine-dragons-it-s-time-ep",
      discNumber: 1,
      position: 5,
      externalId: "3qasfRKlw6cGDbDhPfZJ8h",
      externalLink: "https://open.spotify.com/track/3qasfRKlw6cGDbDhPfZJ8h",
    },
  ],
} as const satisfies Track
