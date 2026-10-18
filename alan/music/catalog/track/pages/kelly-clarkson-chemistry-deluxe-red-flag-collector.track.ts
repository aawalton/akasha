import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeRedFlagCollector = {
  id: "01a14f45-0230-79f8-b59b-48392c182730",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-red-flag-collector",
  ownLength: 2.982083333333333,
  ownProgress: 2.982083333333333,
  partOfCollections: [
    "release/kelly-clarkson-chemistry-deluxe",
    "release/kelly-clarkson-chemistry",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "red flag collector",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "redflagcollector|3BmGtnKgCSGYIUhmivXKWX|178925",
  song: "song/kelly-clarkson-red-flag-collector",
  carriedBy: [
    {
      release: "release/kelly-clarkson-chemistry",
      discNumber: 1,
      position: 12,
      externalId: "6a0x5MhnYdjxaotPNKXUvW",
      externalLink: "https://open.spotify.com/track/6a0x5MhnYdjxaotPNKXUvW",
    },
    {
      release: "release/kelly-clarkson-chemistry-deluxe",
      discNumber: 1,
      position: 12,
      externalId: "5fJm3A1gghJddHFBxo24dp",
      externalLink: "https://open.spotify.com/track/5fJm3A1gghJddHFBxo24dp",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
