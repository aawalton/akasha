import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasAuldLangSyne = {
  id: "01a0abeb-2d9e-7492-a614-979e3002b0d0",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-auld-lang-syne",
  grade: "A",
  ownLength: 3.6126666666666667,
  ownProgress: 3.6126666666666667,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Auld Lang Syne",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "auldlangsyne|0vn7UBvSQECKJm2817Yf1P|216760",
  song: "song/james-taylor-auld-lang-syne",
  carriedBy: [
    {
      release: "release/james-taylor-james-taylor-at-christmas",
      discNumber: 1,
      position: 12,
      externalId: "0kxQeYiUnr68WfKoFccZsL",
      externalLink: "https://open.spotify.com/track/0kxQeYiUnr68WfKoFccZsL",
    },
  ],
} as const satisfies Track
