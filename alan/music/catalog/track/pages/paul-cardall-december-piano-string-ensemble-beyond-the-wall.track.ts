import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleBeyondTheWall = {
  id: "01a0b4c8-2ce4-742a-aa24-6a5c6806ead6",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-beyond-the-wall",
  ownLength: 3.4731,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0FqDi7tY8acbrRtU4Jb6TD",
      externalLink: "https://open.spotify.com/track/0FqDi7tY8acbrRtU4Jb6TD",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Beyond The Wall",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "beyondthewall|7FQRbf8gbKw8KZQZAJWxH2|208386",
  song: "song/paul-cardall-beyond-the-wall",
} as const satisfies Track
