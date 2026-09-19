import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveBeethovens5SecretsLive = {
  id: "01a0afa2-144c-79dc-a232-8db001e75e7f",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-beethovens-5-secrets-live",
  ownLength: 5.386216666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5loE7SbPdaUAIZ3rGhwKac",
      externalLink: "https://open.spotify.com/track/5loE7SbPdaUAIZ3rGhwKac",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Beethoven's 5 Secrets (Live)",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "beethovens5secretslive|0jW6R8CVyVohuUJVcuweDI|323173",
  song: "song/the-piano-guys-beethovens-5-secrets",
} as const satisfies Track
