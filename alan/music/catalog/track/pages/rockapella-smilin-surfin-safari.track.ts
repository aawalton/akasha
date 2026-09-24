import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinSurfinSafari = {
  id: "01a0d52b-52df-7cbd-aa4f-8a5ba1d2b276",
  type: "page-type/track",
  slug: "rockapella-smilin-surfin-safari",
  ownLength: 3.822,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-smilin"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Surfin' safari",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "surfinsafari|1AFSUleuDTapVhm5zUf4ix|229320",
  song: "song/rockapella-surfin-safari",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 12,
      externalId: "20EHj6pZXeQMjYHwH5bmDu",
      externalLink: "https://open.spotify.com/track/20EHj6pZXeQMjYHwH5bmDu",
    },
  ],
} as const satisfies Track
