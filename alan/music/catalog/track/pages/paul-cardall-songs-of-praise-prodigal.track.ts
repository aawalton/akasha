import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseProdigal = {
  id: "01a0b4c8-520b-7847-bf08-27338e20874b",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-prodigal",
  ownLength: 5.022433333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0BpCQv9S9ofb0pvQGZ5Rc1",
      externalLink: "https://open.spotify.com/track/0BpCQv9S9ofb0pvQGZ5Rc1",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Prodigal",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "prodigal|7FQRbf8gbKw8KZQZAJWxH2|301346",
  song: "song/paul-cardall-prodigal",
} as const satisfies Track
