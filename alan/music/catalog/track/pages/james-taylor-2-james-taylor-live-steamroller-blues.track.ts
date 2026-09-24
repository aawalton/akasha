import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveSteamrollerBlues = {
  id: "01a0abeb-3c97-73a5-8630-4293b0ce5891",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-steamroller-blues",
  ownLength: 5.400433333333333,
  ownProgress: 5.400433333333333,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Steamroller Blues",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "steamrollerblues|0vn7UBvSQECKJm2817Yf1P|324026",
  song: "song/james-taylor-steamroller-blues",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 1,
      position: 8,
      externalId: "1I2RS5C10KUMY5Cbx1Etzs",
      externalLink: "https://open.spotify.com/track/1I2RS5C10KUMY5Cbx1Etzs",
    },
  ],
} as const satisfies Track
