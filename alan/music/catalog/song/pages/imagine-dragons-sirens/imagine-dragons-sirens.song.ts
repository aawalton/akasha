import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsSirens = {
  id: "019ea49b-aaba-7717-9c99-3e3a3ea4d864",
  type: "page-type/song",
  slug: "imagine-dragons-sirens",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1f24e281-8c41-4901-ba8f-1a504d22f27b",
      externalLink: "https://musicbrainz.org/work/1f24e281-8c41-4901-ba8f-1a504d22f27b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sirens",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
