import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftShakeItOff = {
  id: "019ea416-3564-7a0c-93c0-8d74d5703c1a",
  type: "page-type/song",
  slug: "taylor-swift-shake-it-off",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5fa63cad-ca5d-4927-ad27-459388bdebaf",
      externalLink: "https://musicbrainz.org/work/5fa63cad-ca5d-4927-ad27-459388bdebaf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shake It Off",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
