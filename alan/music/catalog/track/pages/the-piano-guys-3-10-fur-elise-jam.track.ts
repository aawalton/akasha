import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310FurEliseJam = {
  id: "01a0afa2-0a8f-7469-857f-a9be0cf476fe",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-fur-elise-jam",
  ownLength: 2.1148833333333332,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "243OYD9RRSZbBFEcDLrQv4",
      externalLink: "https://open.spotify.com/track/243OYD9RRSZbBFEcDLrQv4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Für Elise Jam",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "furelisejam|0jW6R8CVyVohuUJVcuweDI|126893",
  song: "song/the-piano-guys-fur-elise-jam",
} as const satisfies Track
