import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberNeverAgain = {
  id: "01a14f45-023b-7766-85eb-7d96c9de9776",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-never-again",
  ownLength: 3.62155,
  ownProgress: 3.62155,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "completed",
  unit: "unit/minutes",
  title: "Never Again",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "neveragain|3BmGtnKgCSGYIUhmivXKWX|217293",
  song: "song/kelly-clarkson-never-again",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 1,
      externalId: "24y3tSyLdRbpVsKhQrR2oj",
      externalLink: "https://open.spotify.com/track/24y3tSyLdRbpVsKhQrR2oj",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
