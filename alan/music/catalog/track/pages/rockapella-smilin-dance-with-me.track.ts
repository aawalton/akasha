import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinDanceWithMe = {
  id: "01a0d52b-52de-752a-8090-7c040c1442bf",
  type: "page-type/track",
  slug: "rockapella-smilin-dance-with-me",
  ownLength: 2.7415,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-smilin"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Dance With Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "dancewithme|1AFSUleuDTapVhm5zUf4ix|164490",
  song: "song/rockapella-dance-with-me",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 8,
      externalId: "0ZgMHJJszxYX109a0mK7z3",
      externalLink: "https://open.spotify.com/track/0ZgMHJJszxYX109a0mK7z3",
    },
  ],
} as const satisfies Track
