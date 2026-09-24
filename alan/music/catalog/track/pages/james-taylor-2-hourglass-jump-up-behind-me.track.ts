import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassJumpUpBehindMe = {
  id: "01a0abeb-3a90-7d1f-83d6-49a812127ce4",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-jump-up-behind-me",
  ownLength: 3.4717666666666664,
  ownProgress: 3.4717666666666664,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Jump Up Behind Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "jumpupbehindme|0vn7UBvSQECKJm2817Yf1P|208306",
  song: "song/james-taylor-jump-up-behind-me",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 6,
      externalId: "2di380jNR8DLZ72ZdN06e6",
      externalLink: "https://open.spotify.com/track/2di380jNR8DLZ72ZdN06e6",
    },
  ],
} as const satisfies Track
