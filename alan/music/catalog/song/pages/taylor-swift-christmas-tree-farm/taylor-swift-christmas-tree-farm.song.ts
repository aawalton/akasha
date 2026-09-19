import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftChristmasTreeFarm = {
  id: "019ea416-06ff-7fa5-9393-e4b94c5d23ca",
  type: "page-type/song",
  slug: "taylor-swift-christmas-tree-farm",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3e8aaf09-e875-4e8e-8c08-8a72d9112611",
      externalLink: "https://musicbrainz.org/work/3e8aaf09-e875-4e8e-8c08-8a72d9112611",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Christmas Tree Farm",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
