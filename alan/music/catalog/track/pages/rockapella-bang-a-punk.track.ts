import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangAPunk = {
  id: "01a0d52b-52db-70e5-b906-3c84bf88abe7",
  type: "page-type/track",
  slug: "rockapella-bang-a-punk",
  ownLength: 2.3556833333333334,
  ownProgress: 2.3556833333333334,
  partOfCollections: ["release/rockapella-bang"],
  status: "completed",
  unit: "unit/minutes",
  title: "A-Punk",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "apunk|1AFSUleuDTapVhm5zUf4ix|141341",
  song: "song/rockapella-a-punk",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 14,
      externalId: "1sCN83vh7rzQ2d7UGAsoga",
      externalLink: "https://open.spotify.com/track/1sCN83vh7rzQ2d7UGAsoga",
    },
  ],
} as const satisfies Track
