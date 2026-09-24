import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoAwakening = {
  id: "01a0b4c8-3303-754e-9af5-c8828664e3b6",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-awakening",
  ownLength: 2.9704333333333333,
  ownProgress: 2.9704333333333333,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Awakening",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "awakening|7FQRbf8gbKw8KZQZAJWxH2|178226",
  song: "song/paul-cardall-awakening",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 14,
      externalId: "7dDHHDNyDJEmNfhIdQjpSZ",
      externalLink: "https://open.spotify.com/track/7dDHHDNyDJEmNfhIdQjpSZ",
    },
  ],
} as const satisfies Track
