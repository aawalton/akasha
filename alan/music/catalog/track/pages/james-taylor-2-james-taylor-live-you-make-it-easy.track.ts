import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveYouMakeItEasy = {
  id: "01a0abeb-3ebb-74fc-9e67-40c77c00a326",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-you-make-it-easy",
  ownLength: 5.061766666666666,
  ownProgress: 5.061766666666666,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Make It Easy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "youmakeiteasy|0vn7UBvSQECKJm2817Yf1P|303706",
  song: "song/james-taylor-you-make-it-easy",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 2,
      position: 11,
      externalId: "09Wl0w02eHc6ssOKS3vk3g",
      externalLink: "https://open.spotify.com/track/09Wl0w02eHc6ssOKS3vk3g",
    },
  ],
} as const satisfies Track
