import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsFollowYouCutthroatFollowYou = {
  id: "01a0c43f-db95-7c98-8518-68d879ea5db4",
  type: "page-type/track",
  slug: "imagine-dragons-follow-you-cutthroat-follow-you",
  ownLength: 2.9273833333333332,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-follow-you-cutthroat"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7FdUvDkaE24o3FPIWTvzv2",
      externalLink: "https://open.spotify.com/track/7FdUvDkaE24o3FPIWTvzv2",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Follow You",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "followyou|53XhwfbYqKCa1cC15pYq2q|175643",
  song: "song/imagine-dragons-follow-you",
} as const satisfies Track
