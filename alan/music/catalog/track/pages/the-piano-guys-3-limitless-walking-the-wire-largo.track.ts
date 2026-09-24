import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessWalkingTheWireLargo = {
  id: "01a0afa2-0ebe-7a5a-950d-375f3221d9db",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-walking-the-wire-largo",
  ownLength: 4.3011,
  ownProgress: 4.3011,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  status: "completed",
  unit: "unit/minutes",
  title: "Walking the Wire / Largo",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "walkingthewirelargo|0jW6R8CVyVohuUJVcuweDI|258066",
  song: "song/the-piano-guys-walking-the-wire-largo",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-limitless",
      discNumber: 1,
      position: 7,
      externalId: "4yTkWs4AFydRawAHnUvZwG",
      externalLink: "https://open.spotify.com/track/4yTkWs4AFydRawAHnUvZwG",
    },
  ],
} as const satisfies Track
