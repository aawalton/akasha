import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftEpiphany = {
  id: "019ea416-1641-750d-a37d-9ffb93c91469",
  type: "page-type/song",
  slug: "taylor-swift-epiphany",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d6e78894-95a1-4c8d-ab2a-1fc2d67473f7",
      externalLink: "https://musicbrainz.org/work/d6e78894-95a1-4c8d-ab2a-1fc2d67473f7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "epiphany",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
