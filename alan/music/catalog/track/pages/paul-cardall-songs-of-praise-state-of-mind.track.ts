import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseStateOfMind = {
  id: "01a0b4c8-5287-7bdb-bfa6-51e0e9f399fe",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-state-of-mind",
  ownLength: 4.230216666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XfLClx1ygKz4v940yDpWs",
      externalLink: "https://open.spotify.com/track/5XfLClx1ygKz4v940yDpWs",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "State of Mind",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "stateofmind|7FQRbf8gbKw8KZQZAJWxH2|253813",
  song: "song/paul-cardall-state-of-mind",
} as const satisfies Track
