import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiEndOfAnEraRegrets = {
  id: "01a0c43e-7ced-7175-b53b-99b04c307a85",
  type: "page-type/track",
  slug: "emei-end-of-an-era-regrets",
  ownLength: 2.03755,
  ownProgress: 2.03755,
  partOfCollections: ["release/emei-end-of-an-era", "release/emei-regrets"],
  status: "completed",
  unit: "unit/minutes",
  title: "Regrets",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "regrets|7E2aQQjErJocovYFjYLzWU|122253",
  song: "song/emei-regrets",
  carriedBy: [
    {
      release: "release/emei-end-of-an-era",
      discNumber: 1,
      position: 4,
      externalId: "3r22tJVOrEwFfuFZDxmFud",
      externalLink: "https://open.spotify.com/track/3r22tJVOrEwFfuFZDxmFud",
    },
    {
      release: "release/emei-regrets",
      discNumber: 1,
      position: 1,
      externalId: "64l8UD4BRovWTSyrLqManD",
      externalLink: "https://open.spotify.com/track/64l8UD4BRovWTSyrLqManD",
    },
  ],
} as const satisfies Track
