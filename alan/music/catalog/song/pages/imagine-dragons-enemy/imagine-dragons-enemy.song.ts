import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsEnemy = {
  id: "019ea49a-46f2-7e19-a477-1fd5cf260640",
  type: "page-type/song",
  slug: "imagine-dragons-enemy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b936a01d-8a99-4bc0-911e-7886ed7b46d2",
      externalLink: "https://musicbrainz.org/work/b936a01d-8a99-4bc0-911e-7886ed7b46d2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Enemy",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
