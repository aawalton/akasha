import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeMagic = {
  id: "01a14f45-022f-7496-b9b4-96ce89595827",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-magic",
  ownLength: 3.25155,
  ownProgress: 3.25155,
  partOfCollections: [
    "release/kelly-clarkson-chemistry-deluxe",
    "release/kelly-clarkson-chemistry",
    "release/kelly-clarkson-christmastry",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "magic",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "magic|3BmGtnKgCSGYIUhmivXKWX|195093",
  song: "song/kelly-clarkson-magic",
  carriedBy: [
    {
      release: "release/kelly-clarkson-chemistry",
      discNumber: 1,
      position: 8,
      externalId: "48ynA8ip9UxxhWk43k0RXI",
      externalLink: "https://open.spotify.com/track/48ynA8ip9UxxhWk43k0RXI",
    },
    {
      release: "release/kelly-clarkson-chemistry-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "61J6b4o0R4aWYcRp7ttDVd",
      externalLink: "https://open.spotify.com/track/61J6b4o0R4aWYcRp7ttDVd",
    },
    {
      release: "release/kelly-clarkson-christmastry",
      discNumber: 1,
      position: 6,
      externalId: "5J2eCu8YCw1aLx8fv5TEaN",
      externalLink: "https://open.spotify.com/track/5J2eCu8YCw1aLx8fv5TEaN",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
