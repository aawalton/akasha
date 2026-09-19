import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTreacherous = {
  id: "019ea416-4a75-7b7b-9414-7d996ffd374f",
  type: "page-type/song",
  slug: "taylor-swift-treacherous",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c26a7f69-b83e-45a5-9d51-0b64cbcf1e95",
      externalLink: "https://musicbrainz.org/work/c26a7f69-b83e-45a5-9d51-0b64cbcf1e95",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Treacherous",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
