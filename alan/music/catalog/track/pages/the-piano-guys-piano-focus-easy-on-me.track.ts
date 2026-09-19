import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusEasyOnMe = {
  id: "01a0afa1-c35a-7fbf-9915-82eedd520c6e",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-easy-on-me",
  ownLength: 2.9859,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Acs6mGwPJhv8aiIbZvs6t",
      externalLink: "https://open.spotify.com/track/1Acs6mGwPJhv8aiIbZvs6t",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Easy On Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "easyonme|0jW6R8CVyVohuUJVcuweDI|179154",
  song: "song/the-piano-guys-easy-on-me",
} as const satisfies Track
