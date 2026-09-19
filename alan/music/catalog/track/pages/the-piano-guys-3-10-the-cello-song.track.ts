import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310TheCelloSong = {
  id: "01a0afa2-0c75-78f5-83d8-7b821898db31",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-the-cello-song",
  ownLength: 3.2411666666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0sgeEBtOJEl6IsAfxTNuiK",
      externalLink: "https://open.spotify.com/track/0sgeEBtOJEl6IsAfxTNuiK",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Cello Song",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thecellosong|0jW6R8CVyVohuUJVcuweDI|194470",
  song: "song/the-piano-guys-the-cello-song",
} as const satisfies Track
