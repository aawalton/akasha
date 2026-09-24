import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaComfortJoyRockinAroundTheChristmasTree = {
  id: "01a0d52b-52dc-753c-9108-2dc202ffacab",
  type: "page-type/track",
  slug: "rockapella-comfort-joy-rockin-around-the-christmas-tree",
  ownLength: 3.063483333333333,
  ownProgress: 3.063483333333333,
  partOfCollections: ["release/rockapella-comfort-joy"],
  status: "completed",
  unit: "unit/minutes",
  title: "Rockin' around the Christmas Tree",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "rockinaroundthechristmastree|1AFSUleuDTapVhm5zUf4ix|183809",
  song: "song/rockapella-rockin-around-the-christmas-tree",
  carriedBy: [
    {
      release: "release/rockapella-comfort-joy",
      discNumber: 1,
      position: 9,
      externalId: "0jm1N5Z0p7HqecsZjoy8F5",
      externalLink: "https://open.spotify.com/track/0jm1N5Z0p7HqecsZjoy8F5",
    },
  ],
} as const satisfies Track
