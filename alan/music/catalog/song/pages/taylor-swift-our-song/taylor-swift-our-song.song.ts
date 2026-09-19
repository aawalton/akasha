import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftOurSong = {
  id: "019ea416-3522-7e4a-85a6-66e09cf03d4c",
  type: "page-type/song",
  slug: "taylor-swift-our-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5caad38c-af56-4d4e-addb-9f5be2971093",
      externalLink: "https://musicbrainz.org/work/5caad38c-af56-4d4e-addb-9f5be2971093",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Our Song",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
