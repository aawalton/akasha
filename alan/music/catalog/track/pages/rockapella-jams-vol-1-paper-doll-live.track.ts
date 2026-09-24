import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1PaperDollLive = {
  id: "01a0d52b-52dd-736b-9381-ef48b6f3f365",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-paper-doll-live",
  ownLength: 3.68935,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Paper Doll (Live)",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "paperdolllive|1AFSUleuDTapVhm5zUf4ix|221361",
  song: "song/rockapella-paper-doll",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 19,
      externalId: "3u1wjbv5cN8JaRPN4hAg9q",
      externalLink: "https://open.spotify.com/track/3u1wjbv5cN8JaRPN4hAg9q",
    },
  ],
} as const satisfies Track
