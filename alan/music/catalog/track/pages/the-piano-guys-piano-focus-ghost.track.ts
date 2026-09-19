import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusGhost = {
  id: "01a0afa1-c265-7341-9f79-84a419fd2ae9",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-ghost",
  ownLength: 3.4423,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0128MEwwH1KXe0YNzAey0C",
      externalLink: "https://open.spotify.com/track/0128MEwwH1KXe0YNzAey0C",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ghost",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "ghost|0jW6R8CVyVohuUJVcuweDI|206538",
  song: "song/the-piano-guys-ghost",
} as const satisfies Track
