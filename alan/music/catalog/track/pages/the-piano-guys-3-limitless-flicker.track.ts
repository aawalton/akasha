import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessFlicker = {
  id: "01a0afa2-0f1d-7bf5-804f-7d339ea6da88",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-flicker",
  ownLength: 3.27555,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "76vpjsz9JbD4qsSyVScMDq",
      externalLink: "https://open.spotify.com/track/76vpjsz9JbD4qsSyVScMDq",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Flicker",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "flicker|0jW6R8CVyVohuUJVcuweDI|196533",
  song: "song/the-piano-guys-flicker",
} as const satisfies Track
