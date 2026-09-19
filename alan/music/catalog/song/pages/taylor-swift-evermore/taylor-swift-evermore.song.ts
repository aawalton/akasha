import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftEvermore = {
  id: "019ea416-0555-7b7a-ac17-0202e8b1e550",
  type: "page-type/song",
  slug: "taylor-swift-evermore",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "33d0bc78-0ee7-4d6a-ae12-7747e45caa54",
      externalLink: "https://musicbrainz.org/work/33d0bc78-0ee7-4d6a-ae12-7747e45caa54",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "evermore",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
