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
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:12.468Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
