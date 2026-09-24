import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol2LadyMineBachVBeethoven = {
  id: "01a0d52b-52de-79c3-b730-3b2256ef3561",
  type: "page-type/track",
  slug: "rockapella-jams-vol-2-lady-mine-bach-v-beethoven",
  ownLength: 3.0311666666666666,
  ownProgress: 3.0311666666666666,
  partOfCollections: [
    "release/rockapella-jams-vol-2",
    "release/rockapella-where-in-the-world-is-carmen-sandiego-ep",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Lady Mine: Bach V. Beethoven",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "ladyminebachvbeethoven|1AFSUleuDTapVhm5zUf4ix|181870",
  song: "song/rockapella-lady-mine-bach-v-beethoven",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-2",
      discNumber: 1,
      position: 3,
      externalId: "7iHnNMytqxhMro4mW62BLC",
      externalLink: "https://open.spotify.com/track/7iHnNMytqxhMro4mW62BLC",
    },
    {
      release: "release/rockapella-where-in-the-world-is-carmen-sandiego-ep",
      discNumber: 1,
      position: 4,
      externalId: "2DIpjvA58uMHKZjOJKv1Uk",
      externalLink: "https://open.spotify.com/track/2DIpjvA58uMHKZjOJKv1Uk",
    },
  ],
} as const satisfies Track
