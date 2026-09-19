import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoIAintWorried = {
  id: "01a0afa1-ce18-7443-a890-0ceade7f11d7",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-i-aint-worried",
  ownLength: 2.66845,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "35BKBdt0wS8uN70d9gGVUe",
      externalLink: "https://open.spotify.com/track/35BKBdt0wS8uN70d9gGVUe",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I Ain't Worried",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "iaintworried|0jW6R8CVyVohuUJVcuweDI|160107",
  song: "song/the-piano-guys-i-aint-worried",
} as const satisfies Track
