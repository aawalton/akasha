import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishXanny = {
  id: "019ea4aa-23aa-72b0-bab5-7561c9fa91eb",
  type: "page-type/song",
  slug: "billie-eilish-xanny",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7aec9a80-2c88-4da7-af9b-39f68142c00b",
      externalLink: "https://musicbrainz.org/work/7aec9a80-2c88-4da7-af9b-39f68142c00b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "xanny",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
