import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraHeathens = {
  id: "019ea4a5-952e-784d-b12d-74148e5ec209",
  type: "page-type/song",
  slug: "aurora-heathens",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6577c3ae-3a6f-469f-a278-c81babff2746",
      externalLink: "https://musicbrainz.org/work/6577c3ae-3a6f-469f-a278-c81babff2746",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Heathens",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
