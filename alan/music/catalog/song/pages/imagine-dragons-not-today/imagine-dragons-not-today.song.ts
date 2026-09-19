import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsNotToday = {
  id: "019ea49a-b6cb-726f-9660-e09d2841d0be",
  type: "page-type/song",
  slug: "imagine-dragons-not-today",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e1299aba-2caf-428d-bdc7-1a3e3e45cb44",
      externalLink: "https://musicbrainz.org/work/e1299aba-2caf-428d-bdc7-1a3e3e45cb44",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Not Today",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
