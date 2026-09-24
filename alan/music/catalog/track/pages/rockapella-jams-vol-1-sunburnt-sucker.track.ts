import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1SunburntSucker = {
  id: "01a0d52b-52dd-7344-8dda-a5d3ba118389",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-sunburnt-sucker",
  ownLength: 2.9965166666666665,
  ownProgress: 0,
  partOfCollections: [
    "release/rockapella-jams-vol-1",
    "release/rockapella-where-in-the-world-is-carmen-sandiego-ep",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Sunburnt Sucker",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "sunburntsucker|1AFSUleuDTapVhm5zUf4ix|179791",
  song: "song/rockapella-sunburnt-sucker",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 12,
      externalId: "3ALH9ifx3Cn07czScMvD66",
      externalLink: "https://open.spotify.com/track/3ALH9ifx3Cn07czScMvD66",
    },
    {
      release: "release/rockapella-where-in-the-world-is-carmen-sandiego-ep",
      discNumber: 1,
      position: 3,
      externalId: "2Cw7mvIdl86TVnsqsRuSoK",
      externalLink: "https://open.spotify.com/track/2Cw7mvIdl86TVnsqsRuSoK",
    },
  ],
} as const satisfies Track
