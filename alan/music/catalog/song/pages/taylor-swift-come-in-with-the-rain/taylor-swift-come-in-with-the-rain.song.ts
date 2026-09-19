import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftComeInWithTheRain = {
  id: "019ea416-0b6e-731e-8508-68100e47dfc2",
  type: "page-type/song",
  slug: "taylor-swift-come-in-with-the-rain",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "72de71b9-1173-4880-874f-817a9d046cd4",
      externalLink: "https://musicbrainz.org/work/72de71b9-1173-4880-874f-817a9d046cd4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Come In With the Rain",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
