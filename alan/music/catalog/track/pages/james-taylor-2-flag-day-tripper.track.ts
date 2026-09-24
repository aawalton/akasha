import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagDayTripper = {
  id: "01a0abeb-44b3-7539-b2fe-c34432af36da",
  type: "page-type/track",
  slug: "james-taylor-2-flag-day-tripper",
  ownLength: 4.406666666666666,
  ownProgress: 4.406666666666666,
  partOfCollections: ["release/james-taylor-2-flag"],
  status: "completed",
  unit: "unit/minutes",
  title: "Day Tripper",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "daytripper|0vn7UBvSQECKJm2817Yf1P|264400",
  song: "song/james-taylor-day-tripper",
  carriedBy: [
    {
      release: "release/james-taylor-2-flag",
      discNumber: 1,
      position: 3,
      externalId: "45goHlfgQSRpaJyMccZ8AT",
      externalLink: "https://open.spotify.com/track/45goHlfgQSRpaJyMccZ8AT",
    },
  ],
} as const satisfies Track
