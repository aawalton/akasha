import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardMyHeartStoodStill = {
  id: "01a0abeb-2f58-7835-ad8e-b75e0473a406",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-my-heart-stood-still",
  ownLength: 3.4508833333333335,
  ownProgress: 3.4508833333333335,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Heart Stood Still",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "myheartstoodstill|0vn7UBvSQECKJm2817Yf1P|207053",
  song: "song/james-taylor-my-heart-stood-still",
  carriedBy: [
    {
      release: "release/james-taylor-2-american-standard",
      discNumber: 1,
      position: 11,
      externalId: "5NbEQEE3DUOVVyeD1VyHIL",
      externalLink: "https://open.spotify.com/track/5NbEQEE3DUOVVyeD1VyHIL",
    },
  ],
} as const satisfies Track
