import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoSoMuchBetter = {
  id: "01a0d52b-52dd-7890-bf1a-1b3a30d1f6f9",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-so-much-better",
  ownLength: 3.6997,
  ownProgress: 3.6997,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "completed",
  unit: "unit/minutes",
  title: "So Much Better",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "somuchbetter|1AFSUleuDTapVhm5zUf4ix|221982",
  song: "song/rockapella-so-much-better",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 2,
      externalId: "3g8M2fUPXAr1iAW52JewRx",
      externalLink: "https://open.spotify.com/track/3g8M2fUPXAr1iAW52JewRx",
    },
  ],
} as const satisfies Track
