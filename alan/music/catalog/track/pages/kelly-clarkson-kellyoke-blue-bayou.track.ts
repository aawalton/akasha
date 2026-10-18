import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonKellyokeBlueBayou = {
  id: "01a14f45-0237-726f-8116-29114c342ea7",
  type: "page-type/track",
  slug: "kelly-clarkson-kellyoke-blue-bayou",
  ownLength: 3.86675,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-kellyoke"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Blue Bayou",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "bluebayou|3BmGtnKgCSGYIUhmivXKWX|232005",
  song: "song/kelly-clarkson-blue-bayou",
  carriedBy: [
    {
      release: "release/kelly-clarkson-kellyoke",
      discNumber: 1,
      position: 1,
      externalId: "3w67gvawlNpzU1YiP355OM",
      externalLink: "https://open.spotify.com/track/3w67gvawlNpzU1YiP355OM",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
