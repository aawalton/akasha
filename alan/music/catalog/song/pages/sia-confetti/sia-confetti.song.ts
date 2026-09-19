import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaConfetti = {
  id: "019ea4c6-3af8-7938-975c-78bce7017be5",
  type: "page-type/song",
  slug: "sia-confetti",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e264dee0-00a7-4adc-b9ec-76f3659dc91a",
      externalLink: "https://musicbrainz.org/work/e264dee0-00a7-4adc-b9ec-76f3659dc91a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Confetti",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
