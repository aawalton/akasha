import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1CantStopTheFeeling = {
  id: "01a0d52b-52dd-7b39-b4f7-0722b15f0209",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-cant-stop-the-feeling",
  ownLength: 1.5189333333333332,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Can't Stop the Feeling!",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "cantstopthefeeling|1AFSUleuDTapVhm5zUf4ix|91136",
  song: "song/rockapella-cant-stop-the-feeling",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 7,
      externalId: "1jNuvFBC8enS135q8UHZGZ",
      externalLink: "https://open.spotify.com/track/1jNuvFBC8enS135q8UHZGZ",
    },
  ],
} as const satisfies Track
