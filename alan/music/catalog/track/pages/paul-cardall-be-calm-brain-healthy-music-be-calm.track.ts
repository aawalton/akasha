import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallBeCalmBrainHealthyMusicBeCalm = {
  id: "01a0b4c8-6a58-7f39-8746-7c7ba6fd5aab",
  type: "page-type/track",
  slug: "paul-cardall-be-calm-brain-healthy-music-be-calm",
  ownLength: 5.3762,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-be-calm-brain-healthy-music"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1iIqrP7SYGcMfYAmW8HFwQ",
      externalLink: "https://open.spotify.com/track/1iIqrP7SYGcMfYAmW8HFwQ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Be Calm",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "becalm|7FQRbf8gbKw8KZQZAJWxH2|322572",
  song: "song/paul-cardall-be-calm",
} as const satisfies Track
