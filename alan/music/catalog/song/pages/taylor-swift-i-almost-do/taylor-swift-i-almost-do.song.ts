import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIAlmostDo = {
  id: "019ea416-23f8-7134-a53d-318c87f6764a",
  type: "page-type/song",
  slug: "taylor-swift-i-almost-do",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8e836d97-5ecd-404a-9945-2015fc3b54f0",
      externalLink: "https://musicbrainz.org/work/8e836d97-5ecd-404a-9945-2015fc3b54f0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Almost Do",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
