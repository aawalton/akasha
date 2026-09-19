import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaAudio = {
  id: "019ea4c6-430a-785b-8463-7131ad1b47bf",
  type: "page-type/song",
  slug: "sia-audio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e45305da-9439-4eec-9445-398dceb84848",
      externalLink: "https://musicbrainz.org/work/e45305da-9439-4eec-9445-398dceb84848",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Audio",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
