import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidBuzzkillWho = {
  id: "01a0c95e-b22a-7f01-988c-a3dace0a474d",
  type: "page-type/track",
  slug: "lyn-lapid-buzzkill-who",
  ownLength: 3.0791,
  ownProgress: 3.0791,
  partOfCollections: ["release/lyn-lapid-buzzkill"],
  status: "completed",
  unit: "unit/minutes",
  title: "who",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/lyn-lapid" }],
  trackKey: "who|4pfy05cNNTacuOQ6SiSu4v|184746",
  song: "song/lyn-lapid-who",
  carriedBy: [
    {
      release: "release/lyn-lapid-buzzkill",
      discNumber: 1,
      position: 10,
      externalId: "4uec8A7qaTkpbhs8TWKuto",
      externalLink: "https://open.spotify.com/track/4uec8A7qaTkpbhs8TWKuto",
    },
  ],
} as const satisfies Track
