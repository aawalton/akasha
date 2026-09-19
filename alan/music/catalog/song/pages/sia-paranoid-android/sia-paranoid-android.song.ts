import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaParanoidAndroid = {
  id: "019ea4ca-f119-7fe9-b8ee-1c1ad1ade7a3",
  type: "page-type/song",
  slug: "sia-paranoid-android",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1b4ff597-f43f-3dac-9f76-0e7b7f38d0d2",
      externalLink: "https://musicbrainz.org/work/1b4ff597-f43f-3dac-9f76-0e7b7f38d0d2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Paranoid Android",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
