import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonNeverEnoughNeverEnough = {
  id: "01a14f45-023b-7c45-9217-9f2195aef311",
  type: "page-type/track",
  slug: "kelly-clarkson-never-enough-never-enough",
  ownLength: 3.4022166666666664,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-never-enough"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Never Enough",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "neverenough|3BmGtnKgCSGYIUhmivXKWX|204133",
  song: "song/kelly-clarkson-never-enough",
  carriedBy: [
    {
      release: "release/kelly-clarkson-never-enough",
      discNumber: 1,
      position: 1,
      externalId: "4eGfldSRct5z9tQZDp5R5Y",
      externalLink: "https://open.spotify.com/track/4eGfldSRct5z9tQZDp5R5Y",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
