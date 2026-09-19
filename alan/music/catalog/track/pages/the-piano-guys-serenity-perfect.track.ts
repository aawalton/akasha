import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityPerfect = {
  id: "01a0afa2-0a07-7b00-905f-bc8f9d8d7640",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-perfect",
  ownLength: 5.141766666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3lKhN0698rFxwUYb0YlNj4",
      externalLink: "https://open.spotify.com/track/3lKhN0698rFxwUYb0YlNj4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Perfect",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "perfect|0jW6R8CVyVohuUJVcuweDI|308506",
  song: "song/the-piano-guys-perfect",
} as const satisfies Track
