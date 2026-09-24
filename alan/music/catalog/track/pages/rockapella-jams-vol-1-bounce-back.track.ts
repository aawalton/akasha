import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1BounceBack = {
  id: "01a0d52b-52dd-7225-a6de-260697e1151c",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-bounce-back",
  ownLength: 1.25015,
  ownProgress: 1.25015,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bounce Back",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "bounceback|1AFSUleuDTapVhm5zUf4ix|75009",
  song: "song/rockapella-bounce-back",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 5,
      externalId: "0QougYMO3BvmhSnqHTQiqP",
      externalLink: "https://open.spotify.com/track/0QougYMO3BvmhSnqHTQiqP",
    },
  ],
} as const satisfies Track
