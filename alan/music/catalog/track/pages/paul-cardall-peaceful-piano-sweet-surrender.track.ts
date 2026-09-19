import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoSweetSurrender = {
  id: "01a0b4c8-31c4-7dd3-b610-756ad689cf47",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-sweet-surrender",
  ownLength: 3.0182166666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1d26cF9yQ6BDROI8yfarIt",
      externalLink: "https://open.spotify.com/track/1d26cF9yQ6BDROI8yfarIt",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sweet Surrender",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sweetsurrender|7FQRbf8gbKw8KZQZAJWxH2|181093",
  song: "song/paul-cardall-sweet-surrender",
} as const satisfies Track
