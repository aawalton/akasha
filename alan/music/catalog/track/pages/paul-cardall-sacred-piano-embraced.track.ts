import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoEmbraced = {
  id: "01a0b4c8-48bc-79fe-b2a5-20b06dbbda68",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-embraced",
  ownLength: 3.1882166666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7zIfL3Gs8IwKCWuAre4XP6",
      externalLink: "https://open.spotify.com/track/7zIfL3Gs8IwKCWuAre4XP6",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Embraced",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "embraced|7FQRbf8gbKw8KZQZAJWxH2|191293",
  song: "song/paul-cardall-embraced",
} as const satisfies Track
