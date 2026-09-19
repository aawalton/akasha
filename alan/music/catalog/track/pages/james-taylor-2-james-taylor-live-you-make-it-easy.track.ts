import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveYouMakeItEasy = {
  id: "01a0abeb-3ebb-74fc-9e67-40c77c00a326",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-you-make-it-easy",
  ownLength: 5.061766666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "09Wl0w02eHc6ssOKS3vk3g",
      externalLink: "https://open.spotify.com/track/09Wl0w02eHc6ssOKS3vk3g",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "You Make It Easy",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "youmakeiteasy|0vn7UBvSQECKJm2817Yf1P|303706",
  song: "song/james-taylor-you-make-it-easy",
} as const satisfies Track
