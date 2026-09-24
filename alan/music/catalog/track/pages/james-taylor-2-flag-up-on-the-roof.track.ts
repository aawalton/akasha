import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagUpOnTheRoof = {
  id: "01a0abeb-457d-76eb-865d-5d4ebcde9d0b",
  type: "page-type/track",
  slug: "james-taylor-2-flag-up-on-the-roof",
  ownLength: 4.334433333333333,
  ownProgress: 4.334433333333333,
  partOfCollections: ["release/james-taylor-2-flag"],
  status: "completed",
  unit: "unit/minutes",
  title: "Up On The Roof",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "upontheroof|0vn7UBvSQECKJm2817Yf1P|260066",
  song: "song/james-taylor-up-on-the-roof",
  carriedBy: [
    {
      release: "release/james-taylor-2-flag",
      discNumber: 1,
      position: 10,
      externalId: "2mFTBNC08f6Jfre31ynXlw",
      externalLink: "https://open.spotify.com/track/2mFTBNC08f6Jfre31ynXlw",
    },
  ],
} as const satisfies Track
