import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMoses = {
  id: "01a0ba5d-4e91-775c-817a-6f34110837e6",
  type: "page-type/song",
  slug: "coldplay-moses",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3dbac52e-6657-4b44-8c21-b6fa4842140c",
      externalLink: "https://musicbrainz.org/work/3dbac52e-6657-4b44-8c21-b6fa4842140c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Moses",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
