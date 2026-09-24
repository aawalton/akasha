import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol2KazeNiFukaretemo = {
  id: "01a0d52b-52de-7cf7-9aa3-f92dd7c5c65e",
  type: "page-type/track",
  slug: "rockapella-jams-vol-2-kaze-ni-fukaretemo",
  ownLength: 1.7459166666666666,
  ownProgress: 1.7459166666666666,
  partOfCollections: ["release/rockapella-jams-vol-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Kaze Ni Fukaretemo",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "kazenifukaretemo|1AFSUleuDTapVhm5zUf4ix|104755",
  song: "song/rockapella-kaze-ni-fukaretemo",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-2",
      discNumber: 1,
      position: 11,
      externalId: "3fjOK5Zq6S0AcOjLuouLgY",
      externalLink: "https://open.spotify.com/track/3fjOK5Zq6S0AcOjLuouLgY",
    },
  ],
} as const satisfies Track
