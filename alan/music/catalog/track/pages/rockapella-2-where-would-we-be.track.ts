import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2WhereWouldWeBe = {
  id: "01a0d52b-52db-7f3d-8884-62b191a375b3",
  type: "page-type/track",
  slug: "rockapella-2-where-would-we-be",
  ownLength: 3.261616666666667,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Where Would We Be?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "wherewouldwebe|1AFSUleuDTapVhm5zUf4ix|195697",
  song: "song/rockapella-where-would-we-be",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 8,
      externalId: "1uSc6KLWVd5L8algKCAwBA",
      externalLink: "https://open.spotify.com/track/1uSc6KLWVd5L8algKCAwBA",
    },
  ],
} as const satisfies Track
