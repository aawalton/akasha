import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdBrutus = {
  id: "019ea4df-8151-7985-82e5-1c24db95ff91",
  type: "page-type/song",
  slug: "em-beihold-brutus",
  title: "Brutus",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bc6c35c0-1077-41de-a0f3-e6c5d48a49cf",
      externalLink: "https://musicbrainz.org/work/bc6c35c0-1077-41de-a0f3-e6c5d48a49cf",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
