import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3TheSnowQueenMoldauTheSnowQueenMoldau = {
  id: "01a0afa1-e7f0-7cdb-aeb7-a0204cfed9ed",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-snow-queen-moldau-the-snow-queen-moldau",
  ownLength: 4.925,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-snow-queen-moldau"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0vsdIPjKb8veutD9Vn17Dx",
      externalLink: "https://open.spotify.com/track/0vsdIPjKb8veutD9Vn17Dx",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Snow Queen (Moldau)",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thesnowqueenmoldau|0jW6R8CVyVohuUJVcuweDI|295500",
} as const satisfies Track
