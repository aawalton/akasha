import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessFirstDance = {
  id: "01a0afa2-0f63-70a3-9be9-8a5928d6a943",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-first-dance",
  ownLength: 4.60605,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0g7tfERffxAbZy6q1BmykR",
      externalLink: "https://open.spotify.com/track/0g7tfERffxAbZy6q1BmykR",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "First Dance",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "firstdance|0jW6R8CVyVohuUJVcuweDI|276363",
} as const satisfies Track
