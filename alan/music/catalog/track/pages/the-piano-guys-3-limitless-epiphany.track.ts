import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessEpiphany = {
  id: "01a0afa2-0ef8-74b1-9405-2df4de946b26",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-epiphany",
  ownLength: 4.699983333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "06XspRiZpjqVdXVdJNVxzB",
      externalLink: "https://open.spotify.com/track/06XspRiZpjqVdXVdJNVxzB",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Epiphany",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "epiphany|0jW6R8CVyVohuUJVcuweDI|281999",
  song: "song/the-piano-guys-epiphany",
} as const satisfies Track
