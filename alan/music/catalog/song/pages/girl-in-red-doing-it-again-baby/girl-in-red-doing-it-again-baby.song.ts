import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedDoingItAgainBaby = {
  id: "01a0b724-d0e6-7890-b6ae-07fd1411e057",
  type: "page-type/song",
  slug: "girl-in-red-doing-it-again-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2619b081-6b24-4c1e-b5db-0ad9745ad32d",
      externalLink: "https://musicbrainz.org/work/2619b081-6b24-4c1e-b5db-0ad9745ad32d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "DOING IT AGAIN BABY",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
