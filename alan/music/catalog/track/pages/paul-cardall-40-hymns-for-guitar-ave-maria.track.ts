import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarAveMaria = {
  id: "01a0b4c8-1a04-7f4d-854f-1af19bf5519e",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-ave-maria",
  ownLength: 3.55,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Ave Maria",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "avemaria|7FQRbf8gbKw8KZQZAJWxH2|213000",
  song: "song/paul-cardall-ave-maria",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 12,
      externalId: "5eeNMimzxqWafuRr8fZbZu",
      externalLink: "https://open.spotify.com/track/5eeNMimzxqWafuRr8fZbZu",
    },
  ],
} as const satisfies Track
