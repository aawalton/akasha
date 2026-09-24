import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiFerrari = {
  id: "01a0c622-1a37-71b4-817c-25deec1d1c8c",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-ferrari",
  ownLength: 3,
  ownProgress: 3,
  partOfCollections: [
    "release/jessica-baio-sacred-ii",
    "release/jessica-baio-sacred",
    "release/jessica-baio-accident",
    "release/jessica-baio-ferrari",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "ferrari",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "ferrari|0VMFTqmv0hYlWruyBERT95|180000",
  song: "song/jessica-baio-ferrari",
  carriedBy: [
    {
      release: "release/jessica-baio-accident",
      discNumber: 1,
      position: 3,
      externalId: "6zcLDSQlN2efujju55r2AF",
      externalLink: "https://open.spotify.com/track/6zcLDSQlN2efujju55r2AF",
    },
    {
      release: "release/jessica-baio-ferrari",
      discNumber: 1,
      position: 1,
      externalId: "0Pn6qyvt28QTf69QcM4F5U",
      externalLink: "https://open.spotify.com/track/0Pn6qyvt28QTf69QcM4F5U",
    },
    {
      release: "release/jessica-baio-sacred",
      discNumber: 1,
      position: 3,
      externalId: "1fjzRem1LrpKYWUXd5ahAs",
      externalLink: "https://open.spotify.com/track/1fjzRem1LrpKYWUXd5ahAs",
    },
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 2,
      position: 3,
      externalId: "5rmPRq15VWEyeDC7QxPdCY",
      externalLink: "https://open.spotify.com/track/5rmPRq15VWEyeDC7QxPdCY",
    },
  ],
} as const satisfies Track
