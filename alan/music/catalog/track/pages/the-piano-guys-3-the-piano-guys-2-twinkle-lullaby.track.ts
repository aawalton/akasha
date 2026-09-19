import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2TwinkleLullaby = {
  id: "01a0afa2-2139-7956-a59a-fccc09e6dc01",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-twinkle-lullaby",
  ownLength: 1.8541666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "50BSgrvg1WgrudUbw2fQG4",
      externalLink: "https://open.spotify.com/track/50BSgrvg1WgrudUbw2fQG4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Twinkle Lullaby",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "twinklelullaby|0jW6R8CVyVohuUJVcuweDI|111250",
  song: "song/the-piano-guys-twinkle-lullaby",
} as const satisfies Track
