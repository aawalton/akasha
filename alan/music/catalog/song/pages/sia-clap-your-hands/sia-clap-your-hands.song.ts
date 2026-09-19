import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaClapYourHands = {
  id: "019ea4c3-ef7a-79d6-90d0-15a72c903557",
  type: "page-type/song",
  slug: "sia-clap-your-hands",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b1d992b-0ddd-41cf-adb0-355046a12086",
      externalLink: "https://musicbrainz.org/work/5b1d992b-0ddd-41cf-adb0-355046a12086",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Clap Your Hands",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
