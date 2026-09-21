import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomNiceToMeetYou = {
  id: "01a0c43f-b475-7723-b2df-4f0a74274f59",
  type: "page-type/track",
  slug: "imagine-dragons-loom-nice-to-meet-you",
  ownLength: 3.17955,
  ownProgress: 3.17955,
  partOfCollections: ["release/imagine-dragons-loom"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6KmrCHbuNOsdoeDOpwetr7",
      externalLink: "https://open.spotify.com/track/6KmrCHbuNOsdoeDOpwetr7",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Nice to Meet You",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "nicetomeetyou|53XhwfbYqKCa1cC15pYq2q|190773",
  song: "song/imagine-dragons-nice-to-meet-you",
} as const satisfies Track
