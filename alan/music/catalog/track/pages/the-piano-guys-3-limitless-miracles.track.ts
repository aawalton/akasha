import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessMiracles = {
  id: "01a0afa2-0f89-7689-b1b7-27ce280d912a",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-miracles",
  ownLength: 6.232283333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  position: 13,
  status: "not-started",
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
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "miracles|0jW6R8CVyVohuUJVcuweDI|373937",
} as const satisfies Track
