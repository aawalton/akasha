import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonStrongerDeluxeVersionAlone = {
  id: "01a14f45-023f-710f-96aa-eff48d418b64",
  type: "page-type/track",
  slug: "kelly-clarkson-stronger-deluxe-version-alone",
  ownLength: 3.017333333333333,
  ownProgress: 3.017333333333333,
  partOfCollections: ["release/kelly-clarkson-stronger-deluxe-version"],
  status: "completed",
  unit: "unit/minutes",
  title: "Alone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "alone|3BmGtnKgCSGYIUhmivXKWX|181040",
  song: "song/kelly-clarkson-alone",
  carriedBy: [
    {
      release: "release/kelly-clarkson-stronger-deluxe-version",
      discNumber: 1,
      position: 15,
      externalId: "42aFCTIefcZmfYL0mPsnwN",
      externalLink: "https://open.spotify.com/track/42aFCTIefcZmfYL0mPsnwN",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
