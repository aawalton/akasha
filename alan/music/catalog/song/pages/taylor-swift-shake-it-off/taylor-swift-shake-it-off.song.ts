import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftShakeItOff = {
  id: "019ea416-3564-7a0c-93c0-8d74d5703c1a",
  type: "song",
  slug: "taylor-swift-shake-it-off",
  title: "Shake It Off",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5fa63cad-ca5d-4927-ad27-459388bdebaf",
      externalLink: "https://musicbrainz.org/work/5fa63cad-ca5d-4927-ad27-459388bdebaf",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
