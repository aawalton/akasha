import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftGoldRush = {
  id: "019ea416-1a34-7263-a338-b5c3776d5710",
  type: "page-type/song",
  slug: "taylor-swift-gold-rush",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "16f2770d-e18e-4911-9920-437994ea807e",
      externalLink: "https://musicbrainz.org/work/16f2770d-e18e-4911-9920-437994ea807e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "gold rush",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
