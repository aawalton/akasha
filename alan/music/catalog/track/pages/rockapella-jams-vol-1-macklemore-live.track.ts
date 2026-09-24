import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1MacklemoreLive = {
  id: "01a0d52b-52dd-7ad9-adf6-b64fbe13ef55",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-macklemore-live",
  ownLength: 3.7124,
  ownProgress: 3.7124,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Macklemore (Live)",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "macklemorelive|1AFSUleuDTapVhm5zUf4ix|222744",
  song: "song/rockapella-macklemore",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 20,
      externalId: "77GBKWDjx2rVVLwfliCDFr",
      externalLink: "https://open.spotify.com/track/77GBKWDjx2rVVLwfliCDFr",
    },
  ],
} as const satisfies Track
