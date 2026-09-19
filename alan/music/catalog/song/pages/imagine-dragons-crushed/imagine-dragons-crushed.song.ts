import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsCrushed = {
  id: "019ea498-470e-795a-840c-906e218c6b31",
  type: "page-type/song",
  slug: "imagine-dragons-crushed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5100f05c-a17d-4eef-83c5-bc00e3afdd2b",
      externalLink: "https://musicbrainz.org/work/5100f05c-a17d-4eef-83c5-bc00e3afdd2b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Crushed",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
