import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSunshine = {
  id: "019ea4ce-04ad-7795-aa11-14765655d240",
  type: "page-type/song",
  slug: "sia-sunshine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bbee5ae4-8a3f-4b53-9ad4-54cfb847727d",
      externalLink: "https://musicbrainz.org/work/bbee5ae4-8a3f-4b53-9ad4-54cfb847727d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sunshine",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
