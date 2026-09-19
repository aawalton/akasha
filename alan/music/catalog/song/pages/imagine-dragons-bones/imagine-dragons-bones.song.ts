import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBones = {
  id: "019ea49a-1d56-7440-8290-e6f897fff7bf",
  type: "page-type/song",
  slug: "imagine-dragons-bones",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b28bfbd8-044c-4b67-a69a-4a2d217d5484",
      externalLink: "https://musicbrainz.org/work/b28bfbd8-044c-4b67-a69a-4a2d217d5484",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bones",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
