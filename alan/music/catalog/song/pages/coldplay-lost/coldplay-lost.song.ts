import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLost = {
  id: "01a0ba5d-4fd9-7046-b252-c5c3496fd29c",
  type: "page-type/song",
  slug: "coldplay-lost",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "50345b75-70d9-3d67-b07d-1254d275ee7d",
      externalLink: "https://musicbrainz.org/work/50345b75-70d9-3d67-b07d-1254d275ee7d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lost!",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
