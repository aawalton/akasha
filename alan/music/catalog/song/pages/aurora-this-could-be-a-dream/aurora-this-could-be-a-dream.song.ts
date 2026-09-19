import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraThisCouldBeADream = {
  id: "019ea4a7-9471-7c85-aca5-da4d2e7d435c",
  type: "page-type/song",
  slug: "aurora-this-could-be-a-dream",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f2dfa16d-2f97-4675-9adb-09c75ceac3c8",
      externalLink: "https://musicbrainz.org/work/f2dfa16d-2f97-4675-9adb-09c75ceac3c8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "This Could Be a Dream",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
