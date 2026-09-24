import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarJesusPaidItAll = {
  id: "01a0b4c8-1b7b-7a17-9a90-db75cf2aace1",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-jesus-paid-it-all",
  ownLength: 2.8333333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Jesus Paid It All",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "jesuspaiditall|7FQRbf8gbKw8KZQZAJWxH2|170000",
  song: "song/paul-cardall-jesus-paid-it-all",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 23,
      externalId: "1aBsv1kFKPLhZR8IfLRGoC",
      externalLink: "https://open.spotify.com/track/1aBsv1kFKPLhZR8IfLRGoC",
    },
  ],
} as const satisfies Track
