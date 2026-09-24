import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaARockapellaHolidayLittleDrummerBoy = {
  id: "01a0d52b-52db-7299-8bd7-9056afe60949",
  type: "page-type/track",
  slug: "rockapella-a-rockapella-holiday-little-drummer-boy",
  ownLength: 3.4504333333333332,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-a-rockapella-holiday"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Little Drummer Boy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "littledrummerboy|1AFSUleuDTapVhm5zUf4ix|207026",
  song: "song/rockapella-little-drummer-boy",
  carriedBy: [
    {
      release: "release/rockapella-a-rockapella-holiday",
      discNumber: 1,
      position: 9,
      externalId: "26auwMHm2S3PQCoTl84HvL",
      externalLink: "https://open.spotify.com/track/26auwMHm2S3PQCoTl84HvL",
    },
  ],
} as const satisfies Track
