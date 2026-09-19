import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdUnicorn = {
  id: "019ea4df-a2ce-7ef3-b3cc-4067a69d1e35",
  type: "page-type/song",
  slug: "em-beihold-unicorn",
  title: "Unicorn",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c6c036f7-f3b5-4c12-bf3f-d59aa3868418",
      externalLink: "https://musicbrainz.org/work/c6c036f7-f3b5-4c12-bf3f-d59aa3868418",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
