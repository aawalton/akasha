import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoSweetSurrender = {
  id: "01a0b4c8-31c4-7dd3-b610-756ad689cf47",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-sweet-surrender",
  ownLength: 3.0182166666666665,
  ownProgress: 3.0182166666666665,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet Surrender",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "sweetsurrender|7FQRbf8gbKw8KZQZAJWxH2|181093",
  song: "song/paul-cardall-sweet-surrender",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 4,
      externalId: "1d26cF9yQ6BDROI8yfarIt",
      externalLink: "https://open.spotify.com/track/1d26cF9yQ6BDROI8yfarIt",
    },
  ],
} as const satisfies Track
