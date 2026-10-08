import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1BadBoujee = {
  id: "01a0d52b-52dd-772d-879e-21859f43b95a",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-bad-boujee",
  ownLength: 1.2645333333333333,
  ownProgress: 1.2645333333333333,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bad & Boujee",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "badboujee|1AFSUleuDTapVhm5zUf4ix|75872",
  song: "song/rockapella-bad-boujee",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 3,
      externalId: "5nZI4zgyHZNPYRMznU2XiE",
      externalLink: "https://open.spotify.com/track/5nZI4zgyHZNPYRMznU2XiE",
    },
  ],
  createdAt: "2026-09-24T20:46:21.405Z",
  updatedAt: "2026-09-24T21:00:26.000Z",
} as const satisfies Track
