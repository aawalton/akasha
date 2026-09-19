import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxSisyphus = {
  id: "019ea4f6-4f61-7e01-8fcc-a766a46fe9bc",
  type: "page-type/song",
  slug: "lilith-max-sisyphus",
  title: "Sisyphus",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8cd916e7-e439-4e1b-9f38-c990750822e5",
      externalLink: "https://musicbrainz.org/recording/8cd916e7-e439-4e1b-9f38-c990750822e5",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
