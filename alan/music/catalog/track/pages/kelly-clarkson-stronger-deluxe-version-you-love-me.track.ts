import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonStrongerDeluxeVersionYouLoveMe = {
  id: "01a14f45-0240-75c6-8345-d0fc427cf368",
  type: "page-type/track",
  slug: "kelly-clarkson-stronger-deluxe-version-you-love-me",
  ownLength: 4.07,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-stronger-deluxe-version"],
  status: "not-started",
  unit: "unit/minutes",
  title: "You Love Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "youloveme|3BmGtnKgCSGYIUhmivXKWX|244200",
  song: "song/kelly-clarkson-you-love-me",
  carriedBy: [
    {
      release: "release/kelly-clarkson-stronger-deluxe-version",
      discNumber: 1,
      position: 5,
      externalId: "5ixRgMRAyYSdPonq8qrrWr",
      externalLink: "https://open.spotify.com/track/5ixRgMRAyYSdPonq8qrrWr",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
