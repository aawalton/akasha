import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoIllHearYourVoice = {
  id: "01a0d52b-52dd-770f-8302-1fda4ae1ecec",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-ill-hear-your-voice",
  ownLength: 3.9982166666666665,
  ownProgress: 3.9982166666666665,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "completed",
  unit: "unit/minutes",
  title: "I'll Hear Your Voice",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "illhearyourvoice|1AFSUleuDTapVhm5zUf4ix|239893",
  song: "song/rockapella-ill-hear-your-voice",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 5,
      externalId: "1wAjVCw0XBo40jUG05SKF9",
      externalLink: "https://open.spotify.com/track/1wAjVCw0XBo40jUG05SKF9",
    },
  ],
} as const satisfies Track
