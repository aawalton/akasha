import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsNearerMyGodToThee = {
  id: "01a0b4c8-62d9-7adb-85f9-feb1a5d14ee6",
  type: "page-type/track",
  slug: "paul-cardall-hymns-nearer-my-god-to-thee",
  ownLength: 3.2844333333333333,
  ownProgress: 3.2844333333333333,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Nearer My God To Thee",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "nearermygodtothee|7FQRbf8gbKw8KZQZAJWxH2|197066",
  song: "song/paul-cardall-nearer-my-god-to-thee",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 5,
      externalId: "7spnDqggl2pmtwUAWPzf55",
      externalLink: "https://open.spotify.com/track/7spnDqggl2pmtwUAWPzf55",
    },
  ],
} as const satisfies Track
