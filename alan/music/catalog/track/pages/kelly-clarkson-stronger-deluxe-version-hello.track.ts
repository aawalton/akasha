import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonStrongerDeluxeVersionHello = {
  id: "01a14f45-023f-7aa2-b8ca-837be676e8c5",
  type: "page-type/track",
  slug: "kelly-clarkson-stronger-deluxe-version-hello",
  ownLength: 2.9922166666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-stronger-deluxe-version"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Hello",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "hello|3BmGtnKgCSGYIUhmivXKWX|179533",
  song: "song/kelly-clarkson-hello",
  carriedBy: [
    {
      release: "release/kelly-clarkson-stronger-deluxe-version",
      discNumber: 1,
      position: 9,
      externalId: "71esoHcSEs614vlMn2Mtnl",
      externalLink: "https://open.spotify.com/track/71esoHcSEs614vlMn2Mtnl",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
