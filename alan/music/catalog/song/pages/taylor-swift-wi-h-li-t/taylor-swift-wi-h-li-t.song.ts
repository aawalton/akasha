import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWiHLiT = {
  id: "019ea416-42ef-7007-9a14-fa301bd848b4",
  type: "page-type/song",
  slug: "taylor-swift-wi-h-li-t",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0a5aaf26-114e-48b7-90b1-18c90c5bcb23",
      externalLink: "https://musicbrainz.org/work/0a5aaf26-114e-48b7-90b1-18c90c5bcb23",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wi$h Li$t",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
