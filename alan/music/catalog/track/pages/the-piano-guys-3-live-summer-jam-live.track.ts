import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveSummerJamLive = {
  id: "01a0afa2-13de-7cf0-bd53-49068323a4d9",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-summer-jam-live",
  ownLength: 3.66955,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5eqn01HUwtVcyNS9MxULzW",
      externalLink: "https://open.spotify.com/track/5eqn01HUwtVcyNS9MxULzW",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Summer Jam (Live)",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "summerjamlive|0jW6R8CVyVohuUJVcuweDI|220173",
  song: "song/the-piano-guys-summer-jam",
} as const satisfies Track
