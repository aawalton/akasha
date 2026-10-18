import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeRockHudson = {
  id: "01a14f45-0230-75a2-9a02-81acf84fe05a",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-rock-hudson",
  ownLength: 3.3692,
  ownProgress: 3.3692,
  partOfCollections: [
    "release/kelly-clarkson-chemistry-deluxe",
    "release/kelly-clarkson-chemistry",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "rock hudson",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "rockhudson|3BmGtnKgCSGYIUhmivXKWX|202152",
  song: "song/kelly-clarkson-rock-hudson",
  carriedBy: [
    {
      release: "release/kelly-clarkson-chemistry",
      discNumber: 1,
      position: 10,
      externalId: "45hEUx8ywENLrB13nEfntt",
      externalLink: "https://open.spotify.com/track/45hEUx8ywENLrB13nEfntt",
    },
    {
      release: "release/kelly-clarkson-chemistry-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "2zeaXvYUOJpoAJ74NvFPKE",
      externalLink: "https://open.spotify.com/track/2zeaXvYUOJpoAJ74NvFPKE",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
