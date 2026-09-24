import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarInTheGarden = {
  id: "01a0b4c8-1d53-7cf1-8d24-0f93402439c2",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-in-the-garden",
  ownLength: 2.033333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "not-started",
  unit: "unit/minutes",
  title: "In The Garden",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "inthegarden|7FQRbf8gbKw8KZQZAJWxH2|122000",
  song: "song/paul-cardall-in-the-garden",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 36,
      externalId: "5DGKWGBw9KaOErws15lbKs",
      externalLink: "https://open.spotify.com/track/5DGKWGBw9KaOErws15lbKs",
    },
  ],
} as const satisfies Track
