import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessWalkingTheWireLargo = {
  id: "01a0afa2-0ebe-7a5a-950d-375f3221d9db",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-walking-the-wire-largo",
  ownLength: 4.3011,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4yTkWs4AFydRawAHnUvZwG",
      externalLink: "https://open.spotify.com/track/4yTkWs4AFydRawAHnUvZwG",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Walking the Wire / Largo",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "walkingthewirelargo|0jW6R8CVyVohuUJVcuweDI|258066",
  song: "song/the-piano-guys-walking-the-wire-largo",
} as const satisfies Track
