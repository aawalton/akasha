import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2LordOfTheRings = {
  id: "01a0afa2-2035-70f6-98ae-212b6929f509",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-lord-of-the-rings",
  ownLength: 5.65625,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7frDwJ4Fe57hNs0gtHAMR4",
      externalLink: "https://open.spotify.com/track/7frDwJ4Fe57hNs0gtHAMR4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lord of the Rings",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "lordoftherings|0jW6R8CVyVohuUJVcuweDI|339375",
  song: "song/the-piano-guys-lord-of-the-rings",
} as const satisfies Track
