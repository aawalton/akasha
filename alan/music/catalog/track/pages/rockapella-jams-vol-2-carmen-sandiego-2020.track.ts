import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol2CarmenSandiego2020 = {
  id: "01a0d52b-52de-7c52-bbe8-bcc7329e6824",
  type: "page-type/track",
  slug: "rockapella-jams-vol-2-carmen-sandiego-2020",
  ownLength: 2.4806666666666666,
  ownProgress: 2.4806666666666666,
  partOfCollections: ["release/rockapella-jams-vol-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Carmen Sandiego 2020",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "carmensandiego2020|1AFSUleuDTapVhm5zUf4ix|148840",
  song: "song/rockapella-carmen-sandiego-2020",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-2",
      discNumber: 1,
      position: 4,
      externalId: "1tsa5jShHCOm3aWhFhJKpi",
      externalLink: "https://open.spotify.com/track/1tsa5jShHCOm3aWhFhJKpi",
    },
  ],
} as const satisfies Track
