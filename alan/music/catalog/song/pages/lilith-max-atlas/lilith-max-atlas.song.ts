import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxAtlas = {
  id: "019ea4f5-4ae7-7ed7-a1fe-60d0197aa178",
  type: "page-type/song",
  slug: "lilith-max-atlas",
  title: "Atlas",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "522a856d-d58a-4e3a-bc18-45a3f0e5a5e1",
      externalLink: "https://musicbrainz.org/recording/522a856d-d58a-4e3a-bc18-45a3f0e5a5e1",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
