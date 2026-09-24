import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagBrotherTrucker = {
  id: "01a0abeb-44ee-7b26-8c16-da924006f635",
  type: "page-type/track",
  slug: "james-taylor-2-flag-brother-trucker",
  ownLength: 4.014433333333334,
  ownProgress: 4.014433333333334,
  partOfCollections: ["release/james-taylor-2-flag"],
  status: "completed",
  unit: "unit/minutes",
  title: "Brother Trucker",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "brothertrucker|0vn7UBvSQECKJm2817Yf1P|240866",
  song: "song/james-taylor-brother-trucker",
  carriedBy: [
    {
      release: "release/james-taylor-2-flag",
      discNumber: 1,
      position: 5,
      externalId: "3usf2U2VlBuUtBDPzTS2Ok",
      externalLink: "https://open.spotify.com/track/3usf2U2VlBuUtBDPzTS2Ok",
    },
  ],
} as const satisfies Track
