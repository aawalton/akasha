import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoIAmYourMan = {
  id: "01a0d52b-52dd-7f3c-ad41-3019f49089a9",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-i-am-your-man",
  ownLength: 2.9798833333333334,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "not-started",
  unit: "unit/minutes",
  title: "I Am Your Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "iamyourman|1AFSUleuDTapVhm5zUf4ix|178793",
  song: "song/rockapella-i-am-your-man",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 4,
      externalId: "3Ab2rKPvXNTUGYgDo1L1tm",
      externalLink: "https://open.spotify.com/track/3Ab2rKPvXNTUGYgDo1L1tm",
    },
  ],
} as const satisfies Track
