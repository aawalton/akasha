import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiEndOfAnEraLateToTheParty = {
  id: "01a0c43e-7c25-7d6c-b0f7-06812e8eab6f",
  type: "page-type/track",
  slug: "emei-end-of-an-era-late-to-the-party",
  ownLength: 2.952933333333333,
  ownProgress: 2.952933333333333,
  partOfCollections: ["release/emei-end-of-an-era", "release/emei-late-to-the-party"],
  status: "completed",
  unit: "unit/minutes",
  title: "Late to the Party",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "latetotheparty|7E2aQQjErJocovYFjYLzWU|177176",
  song: "song/emei-late-to-the-party",
  carriedBy: [
    {
      release: "release/emei-end-of-an-era",
      discNumber: 1,
      position: 1,
      externalId: "6mosJ1QPOVKKSI95ApkWXz",
      externalLink: "https://open.spotify.com/track/6mosJ1QPOVKKSI95ApkWXz",
    },
    {
      release: "release/emei-late-to-the-party",
      discNumber: 1,
      position: 1,
      externalId: "7hdMPlOGOngKH3mj4pVLcG",
      externalLink: "https://open.spotify.com/track/7hdMPlOGOngKH3mj4pVLcG",
    },
  ],
} as const satisfies Track
