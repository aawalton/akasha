import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusTheStoryteller = {
  id: "01a0afa1-c2ab-7d47-98ab-99c3b6eed29a",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-the-storyteller",
  ownLength: 4.678566666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2JzswEgUwjTwkZ1ZqmDuti",
      externalLink: "https://open.spotify.com/track/2JzswEgUwjTwkZ1ZqmDuti",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Storyteller",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thestoryteller|0jW6R8CVyVohuUJVcuweDI|280714",
} as const satisfies Track
