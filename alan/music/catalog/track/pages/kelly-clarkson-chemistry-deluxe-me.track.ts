import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeMe = {
  id: "01a14f45-022f-7aad-ad86-68e997920626",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-me",
  ownLength: 3.579083333333333,
  ownProgress: 0,
  partOfCollections: [
    "release/kelly-clarkson-chemistry-deluxe",
    "release/kelly-clarkson-chemistry",
    "release/kelly-clarkson-i-hate-love-feat-steve-martin",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "me|3BmGtnKgCSGYIUhmivXKWX|214745",
  song: "song/kelly-clarkson-me",
  carriedBy: [
    {
      release: "release/kelly-clarkson-chemistry",
      discNumber: 1,
      position: 4,
      externalId: "2MoSO8vwJ8tJssBjjVKa3u",
      externalLink: "https://open.spotify.com/track/2MoSO8vwJ8tJssBjjVKa3u",
    },
    {
      release: "release/kelly-clarkson-chemistry-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "7hgTp1muLHN5TtxSAY3Up1",
      externalLink: "https://open.spotify.com/track/7hgTp1muLHN5TtxSAY3Up1",
    },
    {
      release: "release/kelly-clarkson-i-hate-love-feat-steve-martin",
      discNumber: 1,
      position: 4,
      externalId: "6KF5mWIqRzxArHFWwpb4Pb",
      externalLink: "https://open.spotify.com/track/6KF5mWIqRzxArHFWwpb4Pb",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
