import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoOnTheLastNight = {
  id: "01a0d52b-52dd-7619-b6fb-5a1576f72c35",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-on-the-last-night",
  ownLength: 4.07355,
  ownProgress: 4.07355,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "completed",
  unit: "unit/minutes",
  title: "On the Last Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "onthelastnight|1AFSUleuDTapVhm5zUf4ix|244413",
  song: "song/rockapella-on-the-last-night",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 11,
      externalId: "62N7DZZAk9FnTq23xjsEFP",
      externalLink: "https://open.spotify.com/track/62N7DZZAk9FnTq23xjsEFP",
    },
  ],
} as const satisfies Track
