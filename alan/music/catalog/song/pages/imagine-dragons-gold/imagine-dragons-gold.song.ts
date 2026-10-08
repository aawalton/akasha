import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsGold = {
  id: "019ea499-e8f5-750c-be7f-677af30e7a4c",
  type: "page-type/song",
  slug: "imagine-dragons-gold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ace5b709-c993-4a52-a13f-4e818a5ef0c3",
      externalLink: "https://musicbrainz.org/work/ace5b709-c993-4a52-a13f-4e818a5ef0c3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Gold",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:20:10.613Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
