import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveWalkingMan = {
  id: "01a0abeb-3d84-7573-8d3b-79af900f19ce",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-walking-man",
  ownLength: 4.5911,
  ownProgress: 4.5911,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Walking Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "walkingman|0vn7UBvSQECKJm2817Yf1P|275466",
  song: "song/james-taylor-walking-man",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 2,
      position: 1,
      externalId: "0nL5J9kKl9aniVySzW0MmD",
      externalLink: "https://open.spotify.com/track/0nL5J9kKl9aniVySzW0MmD",
    },
  ],
} as const satisfies Track
