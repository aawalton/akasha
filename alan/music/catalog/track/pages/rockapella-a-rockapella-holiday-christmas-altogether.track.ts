import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaARockapellaHolidayChristmasAltogether = {
  id: "01a0d52b-52db-7027-8a33-a86260449fba",
  type: "page-type/track",
  slug: "rockapella-a-rockapella-holiday-christmas-altogether",
  ownLength: 4.99655,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-a-rockapella-holiday"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Christmas Altogether",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "christmasaltogether|1AFSUleuDTapVhm5zUf4ix|299793",
  song: "song/rockapella-christmas-altogether",
  carriedBy: [
    {
      release: "release/rockapella-a-rockapella-holiday",
      discNumber: 1,
      position: 10,
      externalId: "2oB3olmdt4jeMWx5ZJF5Ym",
      externalLink: "https://open.spotify.com/track/2oB3olmdt4jeMWx5ZJF5Ym",
    },
  ],
} as const satisfies Track
