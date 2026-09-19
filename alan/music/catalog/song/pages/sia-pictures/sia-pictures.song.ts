import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaPictures = {
  id: "019ea4cb-02bd-74dd-ad94-53479c58a0b8",
  type: "page-type/song",
  slug: "sia-pictures",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1c201249-bdc2-4748-ae82-b038b398ee2b",
      externalLink: "https://musicbrainz.org/work/1c201249-bdc2-4748-ae82-b038b398ee2b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pictures",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
