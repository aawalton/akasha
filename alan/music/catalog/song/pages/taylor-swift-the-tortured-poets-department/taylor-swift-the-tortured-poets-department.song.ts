import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheTorturedPoetsDepartment = {
  id: "019ea416-3883-78e4-89f1-f3a9cb402ee5",
  type: "page-type/song",
  slug: "taylor-swift-the-tortured-poets-department",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7ebce128-5d46-48e3-bff7-b4de14818779",
      externalLink: "https://musicbrainz.org/work/7ebce128-5d46-48e3-bff7-b4de14818779",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Tortured Poets Department",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
