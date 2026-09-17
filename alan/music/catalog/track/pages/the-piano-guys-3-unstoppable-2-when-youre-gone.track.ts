import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2WhenYoureGone = {
  id: "01a0afa1-da5f-7b07-af46-b6596c89a2c6",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-when-youre-gone",
  ownLength: 3,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2NSJIwZfkJOg1eYBX414sw",
      externalLink: "https://open.spotify.com/track/2NSJIwZfkJOg1eYBX414sw",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "When You're Gone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "whenyouregone|0jW6R8CVyVohuUJVcuweDI|180000",
} as const satisfies Track
