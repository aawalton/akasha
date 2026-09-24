import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoBedOfNails = {
  id: "01a0d52b-52dc-758a-96a4-60a8d245e58a",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-bed-of-nails",
  ownLength: 3.5691,
  ownProgress: 3.5691,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bed of Nails",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "bedofnails|1AFSUleuDTapVhm5zUf4ix|214146",
  song: "song/rockapella-bed-of-nails",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 10,
      externalId: "0DAPJTY7aHZUlL95oILIB6",
      externalLink: "https://open.spotify.com/track/0DAPJTY7aHZUlL95oILIB6",
    },
  ],
} as const satisfies Track
