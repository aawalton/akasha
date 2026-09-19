import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioOverAgain = {
  id: "019ea4f8-5cba-74cb-a3f2-2be1c927efa2",
  type: "page-type/song",
  slug: "jessica-baio-over-again",
  title: "over again",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e95be9b6-fb7b-4428-ac89-6fe07dd8a6e5",
      externalLink: "https://musicbrainz.org/recording/e95be9b6-fb7b-4428-ac89-6fe07dd8a6e5",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
