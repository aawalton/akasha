import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysMichaelMeetsMozart = {
  id: "01a0afa2-19dc-7004-84cf-540ddfc53de7",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-michael-meets-mozart",
  ownLength: 5.345983333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7i9XGfQXm9fY3CM4fLa2vA",
      externalLink: "https://open.spotify.com/track/7i9XGfQXm9fY3CM4fLa2vA",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Michael Meets Mozart",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "michaelmeetsmozart|0jW6R8CVyVohuUJVcuweDI|320759",
  song: "song/the-piano-guys-michael-meets-mozart",
} as const satisfies Track
