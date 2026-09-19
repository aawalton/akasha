import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonCry = {
  id: "019ea4b0-6b84-77aa-bc73-4d1068b75e00",
  type: "page-type/song",
  slug: "kelly-clarkson-cry",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d357de82-7e7d-3d59-9608-a8cea2559121",
      externalLink: "https://musicbrainz.org/work/d357de82-7e7d-3d59-9608-a8cea2559121",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cry",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
