import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaRewrite = {
  id: "019ea4cb-9746-77f8-ad48-e92a63256b79",
  type: "page-type/song",
  slug: "sia-rewrite",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2b819c8b-01f5-43de-87a4-b4109b62c304",
      externalLink: "https://musicbrainz.org/work/2b819c8b-01f5-43de-87a4-b4109b62c304",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rewrite",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
