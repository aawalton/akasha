import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomNiceToMeetYou = {
  id: "01a0c43f-b475-7723-b2df-4f0a74274f59",
  type: "page-type/track",
  slug: "imagine-dragons-loom-nice-to-meet-you",
  ownLength: 3.17955,
  ownProgress: 3.17955,
  partOfCollections: ["release/imagine-dragons-loom"],
  status: "completed",
  unit: "unit/minutes",
  title: "Nice to Meet You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "nicetomeetyou|53XhwfbYqKCa1cC15pYq2q|190773",
  song: "song/imagine-dragons-nice-to-meet-you",
  carriedBy: [
    {
      release: "release/imagine-dragons-loom",
      discNumber: 1,
      position: 2,
      externalId: "6KmrCHbuNOsdoeDOpwetr7",
      externalLink: "https://open.spotify.com/track/6KmrCHbuNOsdoeDOpwetr7",
    },
  ],
} as const satisfies Track
