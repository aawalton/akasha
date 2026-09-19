import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLittleWing = {
  id: "019ea4c7-469f-73a3-a2b1-919bffcdc463",
  type: "page-type/song",
  slug: "sia-little-wing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "361cae0a-6a36-48ad-8052-f36729f188c5",
      externalLink: "https://musicbrainz.org/work/361cae0a-6a36-48ad-8052-f36729f188c5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Little Wing",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
