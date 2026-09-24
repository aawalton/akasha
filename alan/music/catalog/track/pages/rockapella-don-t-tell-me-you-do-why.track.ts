import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoWhy = {
  id: "01a0d52b-52dd-754d-bab6-a664577faea7",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-why",
  ownLength: 3.64955,
  ownProgress: 3.64955,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "completed",
  unit: "unit/minutes",
  title: "Why",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "why|1AFSUleuDTapVhm5zUf4ix|218973",
  song: "song/rockapella-why",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 9,
      externalId: "61lQuFFD4FPQbGbybMkomX",
      externalLink: "https://open.spotify.com/track/61lQuFFD4FPQbGbybMkomX",
    },
  ],
} as const satisfies Track
