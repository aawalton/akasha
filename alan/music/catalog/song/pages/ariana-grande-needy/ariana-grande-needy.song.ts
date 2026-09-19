import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNeedy = {
  id: "019ea4e7-c36b-78e6-9550-07f8e1195927",
  type: "page-type/song",
  slug: "ariana-grande-needy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "db238bb2-23e9-42e4-9d00-21f654742602",
      externalLink: "https://musicbrainz.org/work/db238bb2-23e9-42e4-9d00-21f654742602",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "needy",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
