import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarKingsfold = {
  id: "01a0b4c8-1930-7756-b448-7695ff4b4da7",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-kingsfold",
  ownLength: 3.4166666666666665,
  ownProgress: 3.4166666666666665,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "completed",
  unit: "unit/minutes",
  title: "Kingsfold",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "kingsfold|7FQRbf8gbKw8KZQZAJWxH2|205000",
  song: "song/paul-cardall-kingsfold",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 6,
      externalId: "7n9BXhRztMhnWgtwIfLtug",
      externalLink: "https://open.spotify.com/track/7n9BXhRztMhnWgtwIfLtug",
    },
  ],
} as const satisfies Track
