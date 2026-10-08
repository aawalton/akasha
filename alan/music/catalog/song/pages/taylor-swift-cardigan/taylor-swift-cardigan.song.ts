import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCardigan = {
  id: "019ea416-0596-7d5b-a981-e2997ebab574",
  type: "page-type/song",
  slug: "taylor-swift-cardigan",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "33d85bba-6afc-4324-8690-28ea9b40c526",
      externalLink: "https://musicbrainz.org/work/33d85bba-6afc-4324-8690-28ea9b40c526",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "cardigan",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:07.190Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
