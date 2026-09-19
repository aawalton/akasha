import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMyTearsRicochet = {
  id: "019ea416-318a-78fa-9607-abcc129f5ddd",
  type: "page-type/song",
  slug: "taylor-swift-my-tears-ricochet",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3c19b20f-dfa4-469a-9502-8f663f6d7df1",
      externalLink: "https://musicbrainz.org/work/3c19b20f-dfa4-469a-9502-8f663f6d7df1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "my tears ricochet",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
