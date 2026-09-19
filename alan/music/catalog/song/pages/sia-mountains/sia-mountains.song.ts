import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaMountains = {
  id: "019ea4ca-209a-7418-8eb5-1e48f1c23b95",
  type: "page-type/song",
  slug: "sia-mountains",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e843b885-43f4-43e7-beae-10aa281ec25e",
      externalLink: "https://musicbrainz.org/work/e843b885-43f4-43e7-beae-10aa281ec25e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mountains",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
