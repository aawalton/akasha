import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoDontTellMeYouDo = {
  id: "01a0d52b-52dc-7591-9946-6ada7d4f673a",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-dont-tell-me-you-do",
  ownLength: 4.3607,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Don't Tell Me You Do",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "donttellmeyoudo|1AFSUleuDTapVhm5zUf4ix|261642",
  song: "song/rockapella-dont-tell-me-you-do",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 3,
      externalId: "1pbj5GrIlIM5ZiQl6KSOpp",
      externalLink: "https://open.spotify.com/track/1pbj5GrIlIM5ZiQl6KSOpp",
    },
  ],
} as const satisfies Track
