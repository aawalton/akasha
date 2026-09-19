import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaIGoToSleep = {
  id: "019ea4c7-2914-7092-9c44-9960552994f4",
  type: "page-type/song",
  slug: "sia-i-go-to-sleep",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2f843faf-5071-3e80-8d09-9ea38c1c2f39",
      externalLink: "https://musicbrainz.org/work/2f843faf-5071-3e80-8d09-9ea38c1c2f39",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Go to Sleep",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
