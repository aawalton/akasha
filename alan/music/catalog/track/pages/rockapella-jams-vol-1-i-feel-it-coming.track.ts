import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1IFeelItComing = {
  id: "01a0d52b-52dd-7961-9959-e1479abf94de",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-i-feel-it-coming",
  ownLength: 1.519,
  ownProgress: 1.519,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Feel It Coming",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "ifeelitcoming|1AFSUleuDTapVhm5zUf4ix|91140",
  song: "song/rockapella-i-feel-it-coming",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 1,
      externalId: "0v9HfURml69JuldExhuw8W",
      externalLink: "https://open.spotify.com/track/0v9HfURml69JuldExhuw8W",
    },
  ],
} as const satisfies Track
