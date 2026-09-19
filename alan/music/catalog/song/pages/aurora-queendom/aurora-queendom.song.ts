import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraQueendom = {
  id: "019ea4a3-96d7-7519-85d0-de560dc7c201",
  type: "page-type/song",
  slug: "aurora-queendom",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1a82dfbf-326a-4912-a5cd-687deb2ebeb0",
      externalLink: "https://musicbrainz.org/work/1a82dfbf-326a-4912-a5cd-687deb2ebeb0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Queendom",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
