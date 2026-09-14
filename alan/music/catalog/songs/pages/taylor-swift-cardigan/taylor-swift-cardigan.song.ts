import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftCardigan = {
  id: "019ea416-0596-7d5b-a981-e2997ebab574",
  type: "song",
  slug: "taylor-swift-cardigan",
  title: "cardigan",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "33d85bba-6afc-4324-8690-28ea9b40c526",
      externalLink: "https://musicbrainz.org/work/33d85bba-6afc-4324-8690-28ea9b40c526",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
