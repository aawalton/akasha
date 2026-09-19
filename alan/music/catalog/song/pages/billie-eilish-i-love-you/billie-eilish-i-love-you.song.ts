import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishILoveYou = {
  id: "019ea4ab-7ca0-7f89-8dd8-62e3c73485a3",
  type: "page-type/song",
  slug: "billie-eilish-i-love-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d891402b-0bac-4707-a017-b164b56e8808",
      externalLink: "https://musicbrainz.org/work/d891402b-0bac-4707-a017-b164b56e8808",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "i love you",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
