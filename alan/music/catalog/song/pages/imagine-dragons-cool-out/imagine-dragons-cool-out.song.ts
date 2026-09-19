import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsCoolOut = {
  id: "019ea496-de89-76e3-8063-00c17f3ae13a",
  type: "page-type/song",
  slug: "imagine-dragons-cool-out",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0be4e651-1478-4fa8-899a-9b1433eaeed5",
      externalLink: "https://musicbrainz.org/work/0be4e651-1478-4fa8-899a-9b1433eaeed5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cool Out",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
