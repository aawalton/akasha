import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsContinual = {
  id: "019ea498-8f14-7f6d-a6a7-76dac2202fd8",
  type: "page-type/song",
  slug: "imagine-dragons-continual",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "64860911-177c-4c81-81af-b5ec8d9b2a53",
      externalLink: "https://musicbrainz.org/work/64860911-177c-4c81-81af-b5ec8d9b2a53",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Continual",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
