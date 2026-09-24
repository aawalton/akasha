import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassTheLookingGlass = {
  id: "01a0b4c8-6175-796d-8937-02fb713902a1",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-the-looking-glass",
  ownLength: 3.768883333333333,
  ownProgress: 3.768883333333333,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Looking Glass",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thelookingglass|7FQRbf8gbKw8KZQZAJWxH2|226133",
  song: "song/paul-cardall-the-looking-glass",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 10,
      externalId: "58ywJxoieqnvmCSvyMHlmB",
      externalLink: "https://open.spotify.com/track/58ywJxoieqnvmCSvyMHlmB",
    },
  ],
} as const satisfies Track
