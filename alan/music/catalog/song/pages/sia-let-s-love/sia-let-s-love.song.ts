import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLetSLove = {
  id: "019ea4c9-3d9c-7698-bae8-2e907e68f1fd",
  type: "page-type/song",
  slug: "sia-let-s-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9463a307-24df-44c0-96a5-31fcf8f956bc",
      externalLink: "https://musicbrainz.org/work/9463a307-24df-44c0-96a5-31fcf8f956bc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let’s Love",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
