import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityTheCelloSong = {
  id: "01a0afa2-088c-77ae-ad02-b47c668c0bce",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-the-cello-song",
  ownLength: 3.2671,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0y1z7SkwuZgeg6Xh9qy0uZ",
      externalLink: "https://open.spotify.com/track/0y1z7SkwuZgeg6Xh9qy0uZ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Cello Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thecellosong|0jW6R8CVyVohuUJVcuweDI|196026",
  song: "song/the-piano-guys-the-cello-song",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 3,
      externalId: "0y1z7SkwuZgeg6Xh9qy0uZ",
      externalLink: "https://open.spotify.com/track/0y1z7SkwuZgeg6Xh9qy0uZ",
    },
  ],
} as const satisfies Track
