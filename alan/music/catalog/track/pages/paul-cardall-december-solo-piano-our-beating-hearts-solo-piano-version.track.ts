import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberSoloPianoOurBeatingHeartsSoloPianoVersion = {
  id: "01a0b4c8-2c78-7d87-a8b5-9ee959d130c5",
  type: "page-type/track",
  slug: "paul-cardall-december-solo-piano-our-beating-hearts-solo-piano-version",
  ownLength: 3.468,
  ownProgress: 3.468,
  partOfCollections: ["release/paul-cardall-december-solo-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Our Beating Hearts - Solo Piano Version",
  trackType: "version",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ourbeatingheartssolopianoversion|7FQRbf8gbKw8KZQZAJWxH2|208080",
  song: "song/paul-cardall-our-beating-hearts",
  carriedBy: [
    {
      release: "release/paul-cardall-december-solo-piano",
      discNumber: 1,
      position: 13,
      externalId: "32UMKSrABdL44m3Te70kji",
      externalLink: "https://open.spotify.com/track/32UMKSrABdL44m3Te70kji",
    },
  ],
} as const satisfies Track
