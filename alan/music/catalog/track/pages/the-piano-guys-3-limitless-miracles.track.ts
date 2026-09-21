import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessMiracles = {
  id: "01a0afa2-0f89-7689-b1b7-27ce280d912a",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-miracles",
  ownLength: 6.232283333333333,
  ownProgress: 6.232283333333333,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  position: 13,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ADcZAP8iMKpOaX4XQbSQH",
      externalLink: "https://open.spotify.com/track/3ADcZAP8iMKpOaX4XQbSQH",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Miracles",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "miracles|0jW6R8CVyVohuUJVcuweDI|373937",
  song: "song/the-piano-guys-miracles",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-limitless",
      discNumber: 1,
      position: 13,
      externalId: "3ADcZAP8iMKpOaX4XQbSQH",
      externalLink: "https://open.spotify.com/track/3ADcZAP8iMKpOaX4XQbSQH",
    },
  ],
} as const satisfies Track
