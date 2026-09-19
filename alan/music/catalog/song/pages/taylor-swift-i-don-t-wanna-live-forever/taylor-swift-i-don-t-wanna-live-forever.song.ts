import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIDonTWannaLiveForever = {
  id: "019ea416-2a8e-73c6-8264-d8b40c10b832",
  type: "page-type/song",
  slug: "taylor-swift-i-don-t-wanna-live-forever",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d5432aeb-485b-4f3c-80d2-6e9108ee601d",
      externalLink: "https://musicbrainz.org/work/d5432aeb-485b-4f3c-80d2-6e9108ee601d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Don’t Wanna Live Forever",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
