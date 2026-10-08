import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2BlahBlahBlah = {
  id: "01a0d52b-52da-75c4-9182-4763e32aae1b",
  type: "page-type/track",
  slug: "rockapella-2-blah-blah-blah",
  ownLength: 3.8545,
  ownProgress: 3.8545,
  partOfCollections: ["release/rockapella-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Blah Blah Blah",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "blahblahblah|1AFSUleuDTapVhm5zUf4ix|231270",
  song: "song/rockapella-blah-blah-blah",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 11,
      externalId: "7aKO5d8hfYPyEziCjx1tiB",
      externalLink: "https://open.spotify.com/track/7aKO5d8hfYPyEziCjx1tiB",
    },
  ],
  createdAt: "2026-09-24T20:46:21.402Z",
  updatedAt: "2026-09-24T21:00:26.000Z",
} as const satisfies Track
