import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheBlueRoomBiggerStronger = {
  id: "01a0b9ef-0486-73e8-816e-1a4e3ce12e2b",
  type: "page-type/track",
  slug: "coldplay-the-blue-room-bigger-stronger",
  ownLength: 4.818883333333333,
  ownProgress: 4.818883333333333,
  partOfCollections: ["release/coldplay-the-blue-room"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bigger Stronger",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "biggerstronger|4gzpq5DPGxSnKTe4SA8HAU|289133",
  song: "song/coldplay-bigger-stronger",
  carriedBy: [
    {
      release: "release/coldplay-the-blue-room",
      discNumber: 1,
      position: 1,
      externalId: "5DJtltTQQvcFhP65SFqKxq",
      externalLink: "https://open.spotify.com/track/5DJtltTQQvcFhP65SFqKxq",
    },
  ],
} as const satisfies Track
