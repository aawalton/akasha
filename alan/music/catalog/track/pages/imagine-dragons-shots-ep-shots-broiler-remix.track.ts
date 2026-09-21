import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsShotsEpShotsBroilerRemix = {
  id: "01a0c43f-dfc8-7ef1-94ff-62dce55f0979",
  type: "page-type/track",
  slug: "imagine-dragons-shots-ep-shots-broiler-remix",
  ownLength: 3.1877666666666666,
  ownProgress: 3.1877666666666666,
  partOfCollections: ["release/imagine-dragons-shots-ep"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4XLm8FNvaTlmTAZmSrrV82",
      externalLink: "https://open.spotify.com/track/4XLm8FNvaTlmTAZmSrrV82",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Shots - Broiler Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" },
    { externalId: "3836OTICMPjhTMMcpPw4EC", artistName: "Broiler" },
  ],
  trackKey: "shotsbroilerremix|3836OTICMPjhTMMcpPw4EC,53XhwfbYqKCa1cC15pYq2q|191266",
  song: "song/imagine-dragons-shots",
  carriedBy: [
    {
      release: "release/imagine-dragons-shots-ep",
      discNumber: 1,
      position: 1,
      externalId: "4XLm8FNvaTlmTAZmSrrV82",
      externalLink: "https://open.spotify.com/track/4XLm8FNvaTlmTAZmSrrV82",
    },
  ],
} as const satisfies Track
