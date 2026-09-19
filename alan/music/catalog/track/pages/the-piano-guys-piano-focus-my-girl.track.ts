import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusMyGirl = {
  id: "01a0afa1-c333-7b0e-b959-2f9dfda18a70",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-my-girl",
  ownLength: 3.9403,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2xPeMMqBVtqVnkVZbiSveu",
      externalLink: "https://open.spotify.com/track/2xPeMMqBVtqVnkVZbiSveu",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "My Girl",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "mygirl|0jW6R8CVyVohuUJVcuweDI|236418",
  song: "song/the-piano-guys-my-girl",
} as const satisfies Track
