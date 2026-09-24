import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagChansonFrancaise = {
  id: "01a0abeb-459a-7ed1-adcb-ab73d722b62a",
  type: "page-type/track",
  slug: "james-taylor-2-flag-chanson-francaise",
  ownLength: 2.0317666666666665,
  ownProgress: 2.0317666666666665,
  partOfCollections: ["release/james-taylor-2-flag"],
  status: "completed",
  unit: "unit/minutes",
  title: "Chanson Francaise",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "chansonfrancaise|0vn7UBvSQECKJm2817Yf1P|121906",
  song: "song/james-taylor-chanson-francaise",
  carriedBy: [
    {
      release: "release/james-taylor-2-flag",
      discNumber: 1,
      position: 11,
      externalId: "1tzcT5sLgvckDDbHnHdouQ",
      externalLink: "https://open.spotify.com/track/1tzcT5sLgvckDDbHnHdouQ",
    },
  ],
} as const satisfies Track
