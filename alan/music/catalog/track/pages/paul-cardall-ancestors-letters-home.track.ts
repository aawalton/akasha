import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsLettersHome = {
  id: "01a0b4c8-1e38-75f9-b1ee-568f9cb0d086",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-letters-home",
  ownLength: 0.976,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-ancestors"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2VDpEIMlCyPwLC6iqKy3Cb",
      externalLink: "https://open.spotify.com/track/2VDpEIMlCyPwLC6iqKy3Cb",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Letters Home",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "lettershome|7FQRbf8gbKw8KZQZAJWxH2|58560",
  song: "song/paul-cardall-letters-home",
} as const satisfies Track
