import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTitans = {
  id: "019ea4cb-e894-7825-8951-07fafd56d8b3",
  type: "page-type/song",
  slug: "sia-titans",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3dc9008a-b2aa-4c6f-b805-f6af8dad118e",
      externalLink: "https://musicbrainz.org/work/3dc9008a-b2aa-4c6f-b805-f6af8dad118e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Titans",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
