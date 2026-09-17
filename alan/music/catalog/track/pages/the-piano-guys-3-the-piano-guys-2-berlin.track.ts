import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2Berlin = {
  id: "01a0afa2-205a-7a67-aa73-b417a8010159",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-berlin",
  ownLength: 4.008333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "155NjB8Mlcp47fM7t9el61",
      externalLink: "https://open.spotify.com/track/155NjB8Mlcp47fM7t9el61",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Berlin",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "berlin|0jW6R8CVyVohuUJVcuweDI|240500",
} as const satisfies Track
