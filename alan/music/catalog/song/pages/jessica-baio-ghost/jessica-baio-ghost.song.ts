import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioGhost = {
  id: "019ea4f7-89c9-7e61-9823-ef3f0d53ef2d",
  type: "page-type/song",
  slug: "jessica-baio-ghost",
  title: "ghost",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6ff0b18f-3a97-4fca-994e-375c591c8883",
      externalLink: "https://musicbrainz.org/recording/6ff0b18f-3a97-4fca-994e-375c591c8883",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
